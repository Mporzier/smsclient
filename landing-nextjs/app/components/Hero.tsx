'use client';

import VideoPlayer from './VideoPlayer';

export default function Hero() {
  return (
    // min-h-screen ensures it takes the full height of the device
    // flex items-center centers the content vertically
    <section className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden px-6 lg:px-10">
      
      {/* Container restricted to max-width but allowed to span full width */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] items-center">
        
        {/* Left Side: 50% width on large screens */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10 py-10">
          <h1 className="text-4xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-black mb-6">
            Des SMS vus par vos clients, en <br />
            <span className="inline-block rounded bg-blue-600 px-3 py-1 text-white mt-2">
              quelques secondes.
            </span>
          </h1>
          
          <p className="mb-10 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
            Générez automatiquement des campagnes, sans même avoir à rédiger.
            Importez vos contacts, on s&apos;occupe du reste.
           </p>

          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <button className="h-14 px-8 rounded-xl bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 hover:scale-105 transition-all">
              Testez gratuitement !
            </button>
            <button className="h-14 px-8 rounded-xl bg-white border-2 border-gray-100 text-gray-900 font-bold shadow-sm hover:bg-gray-50 transition-all">
              Liste d&apos;attente
            </button>
          </div>
        </div>
        
{/* Right Side: Video Player Container */}
<div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end py-10">
  {/* 1920/1080 = 1.77 aspect ratio. 
      A max-width of 720px results in a height of ~405px.
      This feels balanced for a 50/50 hero split.
  */}
  <div className="w-full max-w-[720px] aspect-video">
    <VideoPlayer src="/dummy-video.mp4" poster="/dummy-video.png" />
  </div>
</div>

      </div>
    </section>
  );
}