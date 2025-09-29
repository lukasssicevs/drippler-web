'use client';

import { GoogleChromeLogoIcon } from "@phosphor-icons/react/ssr";
import { sendGAEvent } from '@next/third-parties/google';

export default function FooterDownloadButton() {
  return (
    <a
      href="https://chromewebstore.google.com/detail/drippler-extension/gefbchjonjigmadmmfppgckjimhepapj?authuser=0&hl=lv"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sendGAEvent('event', 'download_extension', { location: 'footer' })}
      className="hidden md:flex h-9 md:h-11 px-3 md:px-4 py-2 rounded-[10px] border border-purple-500/60 items-center gap-2 hover:border-purple-400 transition-colors group"
    >
      <GoogleChromeLogoIcon
        size={20}
        className="text-purple-500/60 group-hover:text-purple-400 transition-colors md:w-6 md:h-6"
      />
      <div className="text-purple-500/60 text-sm md:text-base font-normal font-['Inter'] group-hover:text-purple-400 transition-colors">
        Download Extension
      </div>
    </a>
  );
}