"use client";

export default function EmailVerificationPage() {
  return (
    <div className="p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Email Verified!
            </h1>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-white mb-4">
              Your email has been successfully verified.
            </p>
            <p className="text-gray-400">
              Return to the Drippler extension and sign in with your verified account.
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={() => window.close()}
            className="w-full bg-[#bd5dee] hover:bg-[#a347d9] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Close Tab
          </button>
    </div>
  );
}
