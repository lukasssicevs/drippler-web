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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Enhanced backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        style={{ backdropFilter: "blur(16px)" }}
      />

      {/* Modal container */}
      <div className="relative z-[10000] w-full max-w-md mx-auto">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-[30px] md:rounded-4xl outline outline-1 outline-offset-[-1px] outline-purple-500/30 shadow-2xl relative overflow-hidden">
          {/* Gradient overlay for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/5 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 z-[10001] cursor-pointer group"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
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

          {/* Content wrapper with padding */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
