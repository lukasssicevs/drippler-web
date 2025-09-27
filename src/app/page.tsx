"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon, GoogleChromeLogoIcon, X } from "@phosphor-icons/react/ssr";
import thumbnail from "@/assets/thumbnail.png";
import HeadingDrip from "@/assets/drip.png";
import ChromeWebStore from "@/assets/chrome-web-store.png";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="text-center justify-center text-violet-300 text-md md:text-xl font-medium font-['Inter'] leading-tight mb-8 md:mb-12">
          Start building your virtual wardrobe and trying on clothes with AI.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-12 md:mb-20">
          <div className="flex items-center">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium font-['Inter'] text-center">
              Virtual clothes
            </span>
            <span>
              <Image
                src={HeadingDrip}
                alt="Drip"
                className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain mx-2 md:mx-6"
              />
            </span>
          </div>
          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium font-['Inter'] text-center">
            try-on
          </span>
        </div>

        {/* Chrome Web Store image - hidden on mobile */}
        <div className="hidden md:flex justify-center mb-6 md:mb-8">
          <Image
            src={ChromeWebStore}
            alt="Available on Chrome Web Store"
            className="h-8 w-auto md:h-10 lg:h-12 object-contain"
          />
        </div>

        {/* Thumbnail Image */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl p-4 sm:p-6 md:p-8 bg-black rounded-[30px] sm:rounded-[40px] md:rounded-[60px] outline outline-1 outline-offset-[-1px] outline-zinc-900">
            <div className="relative border border-purple-500 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
              <Image
                src={thumbnail}
                alt="Drippler Extension Preview"
                className="w-full h-auto object-cover scale-102"
                priority
              />
              <div className="absolute inset-0 bg-purple-500/25"></div>
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-zinc-900 rounded-full flex justify-center items-center group cursor-pointer"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-purple-500/25 rounded-full outline outline-1 outline-offset-[-1px] outline-purple-500 flex justify-center items-center group-hover:bg-purple-500/35 transition-colors">
                    <PlayIcon
                      size={24}
                      className="text-white sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                      weight="fill"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Chrome Web Store image and Download Button - shows only on mobile */}
        <div className="md:hidden space-y-4">
          <div className="flex justify-center">
            <Image
              src={ChromeWebStore}
              alt="Available on Chrome Web Store"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="flex justify-center">
            <a
              href="https://chromewebstore.google.com/detail/drippler-extension/gefbchjonjigmadmmfppgckjimhepapj?authuser=0&hl=lv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-purple-500/25 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500 inline-flex justify-center items-center gap-2 hover:bg-purple-500/35 transition-colors"
            >
              <GoogleChromeLogoIcon size={20} className="text-white" />
              <span className="text-white text-sm font-medium">
                Download Extension
              </span>
            </a>
          </div>
        </div>

        {/* Hidden Video Preloader */}
        <iframe
          className="absolute -top-[9999px] left-0 w-0 h-0 opacity-0 pointer-events-none"
          src="https://www.youtube.com/embed/5et54rIiCY0?rel=0&modestbranding=1"
          title="Video Preloader"
          tabIndex={-1}
        />

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-[20px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>

              {/* YouTube Video */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/5et54rIiCY0?autoplay=1&rel=0&modestbranding=1"
                title="Drippler Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
