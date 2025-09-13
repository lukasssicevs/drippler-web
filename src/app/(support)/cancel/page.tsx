'use client';


export default function CancelPage() {
  return (
    <div className="p-8 text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Payment Canceled
          </h1>
          <p className="text-gray-400 mb-8">
            No worries! Your subscription was not activated.
          </p>
        </div>

        {/* Cancel Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">
            What Happened?
          </h2>

          <p className="text-gray-400 mb-6 text-sm">
            You canceled the payment process. Your account remains on the free plan with 15 virtual try-ons per month.
          </p>

          <div className="space-y-4 mb-6">
            <div className="text-left">
              <h3 className="text-white font-medium mb-1">
                Free Plan Still Active
              </h3>
              <p className="text-gray-400 text-sm">
                Continue using Drippler with 15 free generations every month.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-white font-medium mb-1">
                Try Again Anytime
              </h3>
              <p className="text-gray-400 text-sm">
                You can upgrade to Pro whenever you&apos;re ready through your extension.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.close()}
          className="w-full bg-[#bd5dee] hover:bg-[#a347d9] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4 cursor-pointer"
        >
          Close Tab
        </button>

        <p className="text-gray-500 text-sm">
          Return to the Drippler extension to continue using the free plan.
        </p>
    </div>
  );
}