import Image from "next/image";
import { PlayIcon } from "@phosphor-icons/react/ssr";
import thumbnail from "@/assets/thumbnail.png";
import HeadingDrip from "@/assets/heading-drip.svg";
import ChromeWebStore from "@/assets/chrome-web-store.svg";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="text-center justify-center text-violet-300 text-xl font-medium font-['Inter'] leading-tight mb-12">
          Start building your virtual wardrobe and trying on clothes with AI.
        </div>

        <div className="flex items-center justify-center gap-4 mb-20 whitespace-nowrap">
          <span className="text-white text-7xl font-medium font-['Inter']">
            Virtual clothes
          </span>

          <span className="mx-2">
            <HeadingDrip />
          </span>

          <span className="text-white text-7xl font-medium font-['Inter']">
            try-on
          </span>
        </div>

        <div className="flex justify-center mb-8">
          <ChromeWebStore />
        </div>

        {/* Thumbnail Image */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl md:max-w-4xl lg:max-w-6xl p-8 bg-black rounded-[60px] outline outline-1 outline-offset-[-1px] outline-zinc-900">
            <div className="relative border border-purple-500 rounded-[40px] overflow-hidden">
              <Image
                src={thumbnail}
                alt="Drippler Extension Preview"
                className="w-full h-auto object-cover scale-102"
                priority
              />
              <div className="absolute inset-0 bg-purple-500/25"></div>
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/drippler-extension/gefbchjonjigmadmmfppgckjimhepapj?authuser=0&hl=lv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-48 h-48 bg-zinc-900 rounded-full flex justify-center items-center group"
                >
                  <div className="w-40 h-40 bg-purple-500/25 rounded-full outline outline-1 outline-offset-[-1px] outline-purple-500 flex justify-center items-center group-hover:bg-purple-500/35 transition-colors">
                    <PlayIcon size={48} className="text-white" weight="fill" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
