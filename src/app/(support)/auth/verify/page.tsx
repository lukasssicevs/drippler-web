"use client";

import Link from "next/link";

export default function EmailVerificationPage() {
  return (
    <div className="p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-500/25 rounded-full outline outline-1 outline-offset-[-1px] outline-green-500 flex items-center justify-center mx-auto mb-4">
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
          <Link
            href="/"
            className="w-full px-4 py-2 bg-purple-500/25 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500 text-white font-medium hover:bg-purple-500/35 transition-colors inline-block text-center"
          >
            Close Tab
          </Link>
    </div>
  );
}
