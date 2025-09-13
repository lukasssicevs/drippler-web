export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* YouTube Video */}
        <div className="mb-12">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=1&modestbranding=1&rel=0"
              title="Drippler Extension Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto text-center">
          <div className="">
            <p className="text-gray-400 mb-8 leading-relaxed">
              Install the Drippler Chrome extension to start building your
              virtual wardrobe and trying on clothes with AI.
            </p>

            {/* Install Button */}
            <div className="mb-6">
              <button className="w-full bg-[#bd5dee] hover:bg-[#a347d9] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
                Install Chrome Extension
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Already have the extension? Sign in through the extension popup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
