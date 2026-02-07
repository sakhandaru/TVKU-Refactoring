"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BroadcastHeroProps {
  cover: string;
  title: string;
  description: string;
  category: string;
  tickerItems?: string[];
}

export const BroadcastHero = ({
  cover,
  title,
  description,
  category,
  tickerItems = [
    "BREAKING NEWS: Mahasiswa Udinus Ciptakan Robot Pembersih...",
    "UPDATE: Festival Budaya Jawa Tengah Dimulai Hari Ini...",
    "LIVE: Streaming Program Pendidikan TVKU...",
  ],
}: BroadcastHeroProps) => {
  return (
    <div className="w-full bg-white text-black shadow-sm">
      {/* Upper Content Area */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual (Left) - 7 Columns */}
          <div className="lg:col-span-7 relative group aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-200">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14"
              >
                <Play fill="currentColor" className="ml-1" />
              </Button>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm animate-pulse">
                On Air
              </span>
            </div>
          </div>

          {/* Headline Text (Right) - 5 Columns */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-8 bg-primary block"></span>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">
                {category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-neutral-600 leading-relaxed">
              {description}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Read Full Story
              </Button>
              <span className="text-sm font-mono text-neutral-400">
                Updated 2 mins ago
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Bar (Bottom) */}
      <div className="bg-neutral-900 text-white py-3 overflow-hidden flex items-center border-b-4 border-primary relative z-10">
        <div className="bg-primary px-6 py-3 absolute left-0 top-0 bottom-0 z-20 flex items-center font-black uppercase italic tracking-wider shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
          Breaking News
        </div>
        <div className="flex whitespace-nowrap animate-marquee pl-40 md:pl-48">
          {tickerItems.map((item, index) => (
            <span
              key={index}
              className="mx-8 font-medium text-sm md:text-base flex items-center"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 inline-block animate-pulse"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
