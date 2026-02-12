"use client";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Title {
  id: number;
  judul: string;
}

interface Item {
  id: number;
  id_slides_title: number;
  link: string;
  thumbnail: string;
  teks: string;
}

const SeputarUdinus = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTitles([{ id: 1, judul: "Berita Terkini" }]);

        const resItems = await fetchWithFallback<Item[]>(
          "/data/seputar-dinus-extracted.json",
          "/data/seputar-dinus-extracted.json",
        );

        if (Array.isArray(resItems)) {
          setItems(resItems);
        } else if (
          (resItems as any).data &&
          Array.isArray((resItems as any).data)
        ) {
          setItems((resItems as any).data);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen pt-28 md:pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-left">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            Seputar Udinus.
          </h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl">
            Berita dan kegiatan terbaru seputar Universitas Dian Nuswantoro.
          </p>
        </div>

        {titles.map((title) => {
          const relatedItems = items.filter(
            (item) => item.id_slides_title === title.id,
          );

          return (
            <div key={title.id} className="mb-14">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
                  {title.judul}
                </h2>
                <a
                  href={`/seputar_udinus/${title.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  more..
                </a>
              </div>

              <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
                {loading ? (
                  // Skeleton Loader
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="min-w-[85vw] md:min-w-[320px] max-w-[85vw] md:max-w-[320px] aspect-video bg-neutral-200 animate-pulse rounded-none border border-neutral-100"
                    />
                  ))
                ) : relatedItems.length > 0 ? (
                  relatedItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative min-w-[85vw] md:min-w-[320px] max-w-[85vw] md:max-w-[320px] aspect-video rounded-none overflow-hidden shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.teks}
                        width={320}
                        height={180}
                        sizes="(max-width: 768px) 85vw, 320px"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={index < 2}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      <div className="absolute bottom-4 left-4 text-white z-10">
                        <p className="text-xs opacity-80 uppercase tracking-wider font-medium mb-1">
                          Continue Watching
                        </p>
                        <p className="text-base font-bold line-clamp-2 leading-snug">
                          {item.teks}
                        </p>
                      </div>

                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-none backdrop-blur-md border border-white/10">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500 italic">
                    Belum ada konten tersedia.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeputarUdinus;
