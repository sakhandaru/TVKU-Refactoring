"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface HLSPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if the browser supports HLS natively (Safari, etc.)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      const hls = new Hls({
        debug: false,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    }
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative group bg-black rounded-xl overflow-hidden aspect-video shadow-2xl">
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-contain"
        autoPlay={autoPlay}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={false} // Custom controls
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={togglePlay}
            className="hover:text-primary transition-colors"
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button onClick={toggleMute}>
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                if (videoRef.current)
                  videoRef.current.volume = parseFloat(e.target.value);
                setVolume(parseFloat(e.target.value));
              }}
              className="w-24 h-1 bg-white/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex-1"></div>

          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
            LIVE
          </span>

          <button
            onClick={toggleFullscreen}
            className="ml-4 hover:text-primary transition-colors"
          >
            <Maximize size={24} />
          </button>
        </div>
      </div>

      {/* Big Play Button (if paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center pl-2 shadow-2xl animate-pulse">
            <Play size={40} className="text-white" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};
