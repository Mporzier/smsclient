'use client';

import { useRef, useState, useEffect } from 'react';

// Added poster to props
export default function VideoPlayer({ src, poster }: { src: string, poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div 
    className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-gray-100"
      onClick={togglePlay}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        preload="metadata"
        poster={poster} // <--- Added this
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/20">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
            <svg className="w-8 h-8 text-blue-600 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Pause Indicator */}
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
          <div className="p-4 bg-white/30 backdrop-blur-md rounded-full">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}