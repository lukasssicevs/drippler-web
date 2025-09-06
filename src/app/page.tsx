import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              Drippler Extension
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Seamless web integration for your Chrome extension authentication
            </p>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Welcome to Drippler Web
            </h2>
            <p className="text-purple-100 text-lg mb-8 leading-relaxed">
              This web application handles authentication flows for the Drippler
              Chrome extension. Users are redirected here to complete email
              verification and password reset processes.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Email Verification
                </h3>
                <p className="text-purple-100">
                  Verify your email address to activate your Drippler Extension
                  account
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Password Reset
                </h3>
                <p className="text-purple-100">
                  Securely reset your password and regain access to your account
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/verify"
              className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-purple-50 transition-colors duration-200 shadow-lg"
            >
              Email Verification
            </Link>
            <Link
              href="/auth/reset-password"
              className="bg-purple-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-400 transition-colors duration-200 shadow-lg border border-purple-400"
            >
              Reset Password
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-16 text-purple-200 text-sm">
            <p>
              Having trouble? Make sure you have the Drippler Chrome Extension
              installed and configured.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
