# Drippler Extension Web App

A Next.js web application that handles authentication flows for the Drippler Chrome Extension. This app provides secure redirect destinations for email verification and password reset processes.

## Features

- 🔐 **Email Verification** - Handles email confirmation redirects from Supabase
- 🔑 **Password Reset** - Secure password reset flow with form validation
- 🎨 **Modern UI** - Beautiful gradient design matching the extension
- 📱 **Responsive** - Works on all device sizes
- ⚡ **Fast** - Built with Next.js 14 and TypeScript
- 🛡️ **Secure** - Direct integration with Supabase Auth

## Setup

### 1. Environment Configuration

Copy the environment example and configure your Supabase credentials:

```bash
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
NEXT_PUBLIC_EXTENSION_ID=your-extension-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 4. Configure Supabase Auth Settings

In your Supabase dashboard, update the Auth settings:

1. **Site URL**: `http://localhost:3000` (for development)
2. **Redirect URLs**: Add these URLs:
   - `http://localhost:3000/auth/verify`
   - `http://localhost:3000/auth/reset-password`

## Project Structure

```
webapp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── verify/        # Email verification
│   │   │   └── reset-password/ # Password reset
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── AuthLayout.tsx     # Auth page layout
│   │   └── LoadingSpinner.tsx # Loading component
│   └── lib/                   # Utilities
│       ├── supabase.ts        # Supabase client
│       └── auth-utils.ts      # Auth helper functions
├── env.example                # Environment variables template
└── README.md                  # This file
```

## Authentication Flows

### Email Verification

1. User signs up in Chrome extension
2. Supabase sends verification email with link to `/auth/verify`
3. User clicks link and is redirected to web app
4. Web app verifies the session and shows success/error
5. User can close tab and return to extension

### Password Reset

1. User requests password reset in Chrome extension
2. Supabase sends reset email with link to `/auth/reset-password`
3. User clicks link and is redirected to web app
4. Web app verifies the reset token and shows password form
5. User updates password and can return to extension

## Extension Integration

The web app integrates with the Chrome extension through:

- **Redirect URLs**: Extension configures Supabase to redirect to web app
- **Local Storage**: Success states are stored for potential extension pickup
- **Window Messaging**: Can communicate with extension if needed

### Extension Configuration

In your extension's `src/background.js`, the redirect URLs are configured:

```javascript
// For email verification
emailRedirectTo: "http://localhost:3000/auth/verify";

// For password reset
redirectTo: "http://localhost:3000/auth/reset-password";
```

## Deployment

### Production Environment

1. Update environment variables for production:

   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

2. Update Supabase Auth settings with production URLs:

   - `https://your-domain.com/auth/verify`
   - `https://your-domain.com/auth/reset-password`

3. Update extension background script with production URLs

### Deployment Options

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Custom server**

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Auth Flow**: Add new page in `src/app/auth/`
2. **UI Components**: Add to `src/components/`
3. **Utilities**: Add to `src/lib/`

## Security Considerations

- All authentication is handled by Supabase
- No sensitive data is stored in the web app
- HTTPS required for production
- CORS configured through Supabase settings
- Redirect URLs must be whitelisted in Supabase

## Troubleshooting

### Common Issues

1. **"Invalid redirect URL"**: Check Supabase Auth settings
2. **"Session not found"**: Verify the email/reset link hasn't expired
3. **CORS errors**: Ensure site URL is configured in Supabase
4. **Environment variables**: Make sure `.env.local` is properly configured

### Debug Mode

Enable debug logging by adding to `.env.local`:

```env
NEXT_PUBLIC_DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test with the Chrome extension
5. Submit a pull request

## License

This project is part of the Drippler Extension suite and follows the same license terms.
