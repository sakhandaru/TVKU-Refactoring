"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CinematicHeroProps {
  cover: string;
  title: string;
  description: string;
  tags?: string[];
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

export const CinematicHero = ({
  cover,
  title,
  description,
  tags = ["New Release", "HD", "TV-MA"],
  onPlay,
  onMoreInfo,
}: CinematicHeroProps) => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={cover} alt={title} fill className="object-cover" priority />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-2xl space-y-6">
          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg"
          >
            {title}
          </motion.h1>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-semibold tracking-wider text-white/80 border border-white/30 rounded"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white/90 line-clamp-3 md:line-clamp-none max-w-xl drop-shadow-md"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 pt-4"
          >
            <Button
              size="lg"
              onClick={onPlay}
              className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-md flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Play fill="currentColor" size={20} />
              Play Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onMoreInfo}
              className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30 font-semibold px-8 py-6 text-lg rounded-md flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Info size={24} />
              More Info
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
