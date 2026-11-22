"use client";

import { useState, useRef } from "react";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const VIDEO_CLIPS = [
  { src: "/media/videos/clip1.mp4", poster: "/media/flats/flat1-a.jpg", label: "Pine Canopy Views", tag: "Forest Ridge" },
  { src: "/media/videos/clip2.mp4", poster: "/media/flats/flat2-a.jpg", label: "Mountain Mist", tag: "Cedar Retreat" },
  { src: "/media/videos/clip3.mp4", poster: "/media/flats/flat3-a.jpg", label: "Cloud-Level Living", tag: "Valley Suite" },
  { src: "/media/videos/clip4.mp4", poster: "/media/flats/flat4-a.jpg", label: "Fern & Forest", tag: "Studio Escape" },
  { src: "/media/videos/clip5.mp4", poster: "/media/flats/flat5-a.jpg", label: "Whispering Oaks", tag: "Family Corner" },
  { src: "/media/videos/clip6.mp4", poster: "/media/flats/flat6-a.jpg", label: "Starlight Terrace", tag: "Ridge Den" },
  { src: "/media/videos/clip7.mp4", poster: "/media/flats/flat1-b.jpg", label: "Sunrise Ridge", tag: "Golden Hour" },
];

export default function VideoGallery() {
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const fullscreenRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-pine-forest via-moss-slate to-pine-forest overflow-x-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block text-terracotta text-xs font-bold tracking-widest uppercase mb-3 bg-terracotta/20 px-4 py-1.5 rounded-full">
            🎬 Raw Mountain Footage
          </span>
          <h2 className="font-fraunces text-4xl sm:text-5xl text-warm-sand font-bold mb-4">
            See Fairy Meadows Come Alive
          </h2>
          <p className="text-warm-sand/50 text-lg max-w-2xl mx-auto">
            Real footage from our pine-forest flats. Unfiltered mountain life — click any clip for fullscreen.
          </p>
        </div>

        {/* Grid of video clips */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {VIDEO_CLIPS.map((clip, i) => (
            <div
              key={clip.src}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "auto" : "9/16" }}
              onClick={() => setFullscreenVideo(clip.src)}
            >
              <video
                src={clip.src}
                poster={clip.poster}
                muted
                loop
                playsInline
                autoPlay={i < 2}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ minHeight: i === 0 ? "340px" : "160px" }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pine-forest/80 via-transparent to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-terracotta text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                  {clip.tag}
                </div>
                <div className="text-white text-sm font-fraunces font-bold leading-tight">
                  {clip.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setFullscreenVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={fullscreenRef}
              src={fullscreenVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              controls={false}
              className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
            />
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setFullscreenVideo(null)}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2.5 transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
