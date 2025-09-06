"use client";

export default function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Email Verified!
            </h1>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-lg mb-4 text-green-100">
              Your email has been successfully verified.
            </p>
            <p className="text-purple-100">
              Please return to the Drippler Chrome Extension and sign in with
              your email and password.
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
              You can now close this tab and sign in to the Drippler extension
              with your verified account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
