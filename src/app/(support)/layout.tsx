'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    router.push('/');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close modal if clicking on backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#0e0d0d] shadow-2xl relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 text-white hover:text-gray-300 flex items-center justify-center transition-colors duration-200 z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}