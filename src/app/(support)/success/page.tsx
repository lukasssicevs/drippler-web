"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="p-8 text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-500/25 rounded-full outline outline-1 outline-offset-[-1px] outline-green-500 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Welcome to Drippler Pro!
        </h1>
        <p className="text-gray-400 mb-8">
          Your subscription has been activated.
        </p>
      </div>

      {/* Success Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-6">
          What&apos;s Next?
        </h2>

        <div className="space-y-4 mb-6">
          <div className="text-left">
            <h3 className="text-white font-medium mb-1">
              200 Monthly Generations
            </h3>
            <p className="text-gray-400 text-sm">
              Enjoy 200 virtual try-on generations every month.
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-white font-medium mb-1">Premium Features</h3>
            <p className="text-gray-400 text-sm">
              Unlimited avatars and priority support.
            </p>
          </div>
        </div>

        {sessionId && (
          <div className="bg-white/5 p-3 mb-6">
            <p className="text-xs text-gray-400">
              <strong>Session ID:</strong> {sessionId}
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link
        href="/"
        className="w-full px-4 py-2 bg-purple-500/25 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500 text-white font-medium hover:bg-purple-500/35 transition-colors mb-4 inline-block text-center"
      >
        Close Tab
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
