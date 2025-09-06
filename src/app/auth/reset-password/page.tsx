"use client";

export default function PasswordResetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Password Reset
            </h1>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-lg mb-4 text-purple-100">
              Password reset functionality is handled directly in the Drippler
              Chrome Extension.
            </p>
            <p className="text-purple-200 text-sm">
              Please return to the extension to complete your password reset.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={() => window.close()}
              className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors duration-200 shadow-lg"
            >
              Close Tab
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-purple-200 text-sm">
              Return to the Drippler extension to update your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
