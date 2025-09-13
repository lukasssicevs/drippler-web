-- Migration to fix RLS policy for user_generations table
-- Only run the parts that don't already exist

-- Add INSERT policy for user_generations (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'user_generations'
        AND policyname = 'Users can insert own generations'
    ) THEN
        CREATE POLICY "Users can insert own generations" ON user_generations
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END
$$;

-- Update grants to include INSERT permission for user_generations
GRANT SELECT, INSERT ON user_generations TO authenticated;

-- Verify the policies exist
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'user_generations';