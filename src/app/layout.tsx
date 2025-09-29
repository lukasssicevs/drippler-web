import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  XLogoIcon,
  InstagramLogoIcon,
  PinterestLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import DripIcon from "@/assets/drip.svg";
import Header from "@/components/Header";
import FooterDownloadButton from "@/components/FooterDownloadButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Drippler",
  description: "Digital Wardrobe",
  keywords: ["chrome extension", "digital wardrobe", "fashion"],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-neutral-950`}>
      <body className="font-sans antialiased min-h-screen relative bg-gradient-to-b from-neutral-950 to-fuchsia-950">
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
        <Header />

        {/* Main Content */}
        <main className="relative z-10 pt-20 md:pt-24 pb-24 md:pb-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full h-16 md:h-20 bg-[#351148] border-t-1 border-purple-500/20 z-50">
          <div className="w-full px-4 md:px-6 h-full flex items-center justify-between">
            {/* Left - Drippler drip icon - hidden on mobile */}
            <div className="hidden md:flex items-center">
              <DripIcon />
            </div>

            {/* Left - Privacy Policy on mobile, Center on desktop */}
            <div className="flex items-center gap-3 md:gap-7">
              <a
                href="/privacy-policy"
                className="text-purple-500/60 text-sm md:text-base font-normal font-['Inter'] hover:text-purple-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              {/* Download button - hidden on mobile */}
              <FooterDownloadButton />
            </div>

            {/* Right - Social icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <a
                href="https://www.pinterest.com/dripplerxyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500/60 hover:text-purple-400 transition-colors"
              >
                <PinterestLogoIcon size={20} className="md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.instagram.com/dripplerxyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500/60 hover:text-purple-400 transition-colors"
              >
                <InstagramLogoIcon size={20} className="md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.tiktok.com/@drippler_xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500/60 hover:text-purple-400 transition-colors"
              >
                <TiktokLogoIcon size={20} className="md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.youtube.com/@dripplerxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500/60 hover:text-purple-400 transition-colors"
              >
                <YoutubeLogoIcon size={20} className="md:w-8 md:h-8" />
              </a>
              <a
                href="https://x.com/dripplerxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500/60 hover:text-purple-400 transition-colors"
              >
                <XLogoIcon size={20} className="md:w-8 md:h-8" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
