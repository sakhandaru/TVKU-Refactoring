"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Inewsdata {
  id: number;
  judul: string;
  deskripsi: string;
  waktu: string;
  kategori: {
    nama: string;
    slug: string;
  };
  cover: string;
}

interface BentoNewsGridProps {
  news: Inewsdata[];
}

export const BentoNewsGrid = ({ news }: BentoNewsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
      {news.map((item, index) => {
        // Dynamic Grid Spanning Logic for visual variety
        // Layout: 4 cols
        // Item 0: Wide (2 cols)
        // Item 1: Small (1 col)
        // Item 2: Tall (1 col, 2 rows) - Right side
        // Item 3: Small (1 col) - Under Item 0 or 1?
        // Item 4: Wide (2 cols)

        /*
           Grid Layout Plan (4 cols):
           [ Item 0 (2) ] [ Item 1 (1) ] [ Item 2 (1, row-span-2) ]
           [ Item 3 (1) ] [ Item 4 (2) ] [         ...            ]
        */

        let spanClass = "md:col-span-1 md:row-span-1";

        if (index === 0) spanClass = "md:col-span-2 md:row-span-1";
        else if (index === 1) spanClass = "md:col-span-1 md:row-span-1";
        else if (index === 2) spanClass = "md:col-span-1 md:row-span-2";
        else if (index === 3) spanClass = "md:col-span-1 md:row-span-1";
        else if (index === 4) spanClass = "md:col-span-2 md:row-span-1";

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-none bg-neutral-900 border border-neutral-800",
              spanClass,
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={item.cover}
                alt={item.judul}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              {/* Category Badge */}
              <div className="mb-auto">
                <span className="inline-block px-3 py-1 rounded-none text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30 backdrop-blur-md">
                  {item.kategori.nama}
                </span>
              </div>

              <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3
                  className={cn(
                    "font-bold text-white mb-2 leading-tight",
                    index === 0 || index === 4
                      ? "text-2xl md:text-3xl"
                      : "text-xl",
                  )}
                >
                  {item.judul}
                </h3>

                <p className="text-sm text-neutral-300 line-clamp-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {item.deskripsi}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white opacity-0 transform translate-y-4 transition-all duration-300 delay-75 group-hover:opacity-100 group-hover:translate-y-0 text-blue-400">
                  Read Article <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            {/* Hover overlay link area */}
            <Link
              href="#"
              aria-label={`Read article: ${item.judul}`}
              className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
