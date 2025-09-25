"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close modal if clicking on backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        style={{ backdropFilter: "blur(12px)" }}
      />

      {/* Modal container */}
      <div className="relative z-[10000] w-full max-w-md mx-4">
        <div className="bg-zinc-900/30 rounded-[20px] e outline-1 outline-offset-[-1px] outline-zinc-900 shadow-2xl relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 text-white flex items-center justify-center transition-colors duration-200 z-[10001] cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
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
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
