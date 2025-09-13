-- Supabase Database Schema for Drippler Subscription Management

-- User Subscriptions Table
CREATE TABLE user_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'active', 'canceled', 'past_due', 'unpaid')),
    plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generation Tracking Table
CREATE TABLE user_generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    generation_type TEXT NOT NULL DEFAULT 'virtual_tryon' CHECK (generation_type IN ('virtual_tryon', 'avatar_creation')),
    generation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    month_year TEXT NOT NULL, -- Format: '2025-01' for easy querying
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plan Limits Table (for easy configuration)
CREATE TABLE plan_limits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plan_type TEXT NOT NULL UNIQUE CHECK (plan_type IN ('free', 'pro')),
    monthly_generation_limit INTEGER NOT NULL,
    features JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plan limits
INSERT INTO plan_limits (plan_type, monthly_generation_limit, features) VALUES
('free', 15, '{"unlimited_avatars": false, "priority_support": false}'),
('pro', 200, '{"unlimited_avatars": true, "priority_support": true, "advanced_editing": true}');

-- Create indexes for better performance
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_stripe_subscription_id ON user_subscriptions(stripe_subscription_id);
CREATE INDEX idx_user_generations_user_id ON user_generations(user_id);
CREATE INDEX idx_user_generations_month_year ON user_generations(month_year);
CREATE INDEX idx_user_generations_user_month ON user_generations(user_id, month_year);

-- Function to get current month generation count
CREATE OR REPLACE FUNCTION get_user_monthly_generation_count(p_user_id UUID, p_month_year TEXT DEFAULT NULL)
RETURNS INTEGER AS $$
DECLARE
    target_month TEXT;
    generation_count INTEGER;
BEGIN
    -- Use provided month_year or default to current month
    target_month := COALESCE(p_month_year, TO_CHAR(NOW(), 'YYYY-MM'));
    
    SELECT COUNT(*) INTO generation_count
    FROM user_generations
    WHERE user_id = p_user_id AND month_year = target_month;
    
    RETURN COALESCE(generation_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get user's current plan and limits
CREATE OR REPLACE FUNCTION get_user_plan_info(p_user_id UUID)
RETURNS TABLE(
    plan_type TEXT,
    status TEXT,
    monthly_limit INTEGER,
    current_count INTEGER,
    remaining_generations INTEGER,
    subscription_active BOOLEAN,
    cancel_at_period_end BOOLEAN
) AS $$
DECLARE
    user_plan TEXT := 'free';
    user_status TEXT := 'free';
    user_cancel_at_period_end BOOLEAN := FALSE;
    current_month TEXT;
BEGIN
    current_month := TO_CHAR(NOW(), 'YYYY-MM');

    -- Get user's subscription info - include active and past_due subscriptions
    SELECT us.plan_type, us.status, us.cancel_at_period_end
    INTO user_plan, user_status, user_cancel_at_period_end
    FROM user_subscriptions us
    WHERE us.user_id = p_user_id AND us.status IN ('active', 'past_due')
    ORDER BY us.created_at DESC
    LIMIT 1;

    -- Default to free if no active subscription
    user_plan := COALESCE(user_plan, 'free');
    user_status := COALESCE(user_status, 'free');
    user_cancel_at_period_end := COALESCE(user_cancel_at_period_end, FALSE);

    RETURN QUERY
    SELECT
        user_plan,
        user_status,
        pl.monthly_generation_limit,
        get_user_monthly_generation_count(p_user_id, current_month),
        GREATEST(0, pl.monthly_generation_limit - get_user_monthly_generation_count(p_user_id, current_month)),
        (user_status = 'active'),
        user_cancel_at_period_end
    FROM plan_limits pl
    WHERE pl.plan_type = user_plan;
END;
$$ LANGUAGE plpgsql;

-- Function to record a generation
CREATE OR REPLACE FUNCTION record_user_generation(
    p_user_id UUID,
    p_generation_type TEXT DEFAULT 'virtual_tryon',
    p_metadata JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
    current_month TEXT;
    plan_info RECORD;
BEGIN
    current_month := TO_CHAR(NOW(), 'YYYY-MM');
    
    -- Get user's plan info
    SELECT * INTO plan_info FROM get_user_plan_info(p_user_id);
    
    -- Check if user has remaining generations
    IF plan_info.remaining_generations <= 0 THEN
        RETURN FALSE; -- Generation limit exceeded
    END IF;
    
    -- Record the generation
    INSERT INTO user_generations (user_id, generation_type, month_year, metadata)
    VALUES (p_user_id, p_generation_type, current_month, p_metadata);
    
    RETURN TRUE; -- Generation recorded successfully
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) Policies
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_generations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own subscription data
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own generations" ON user_generations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON user_generations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service role can manage all data (for webhooks and admin functions)
CREATE POLICY "Service role can manage subscriptions" ON user_subscriptions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage generations" ON user_generations
    FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON plan_limits TO anon, authenticated;
GRANT SELECT ON user_subscriptions TO authenticated;
GRANT SELECT, INSERT ON user_generations TO authenticated;

-- Functions can be executed by authenticated users
GRANT EXECUTE ON FUNCTION get_user_monthly_generation_count TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_plan_info TO authenticated;
GRANT EXECUTE ON FUNCTION record_user_generation TO authenticated;