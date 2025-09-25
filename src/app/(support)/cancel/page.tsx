"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="p-8 text-center">
      {/* Cancel Icon */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-red-500/25 rounded-full outline outline-1 outline-offset-[-1px] outline-red-500 flex items-center justify-center mx-auto mb-6">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Payment Canceled</h1>
        <p className="text-gray-400 mb-8">
          No worries! Your subscription was not activated.
        </p>
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
