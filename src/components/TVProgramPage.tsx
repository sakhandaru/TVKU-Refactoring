"use client";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Iprogram {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function TVProgramUI() {
  const [program, setProgram] = useState<Iprogram[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error: fetchError } = await fetchWithFallback<{
        data: Iprogram[];
      }>(`${BASE_URL}/our-programs`, "/data/our-programs.json");

      if (data?.data) {
        setProgram(data.data);
      } else if (fetchError) {
        setError(fetchError);
      }
    };
    fetchPrograms();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (program.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(program.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [program.length]);

  if (error)
    return <div className="p-20 text-center">Error loading programs</div>;

  const slides = program.slice(0, 5);

  return (
    <div className="bg-background min-h-screen">
      {/* Featured Header Carousel (Custom Framer Motion) */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          {slides.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <Image
                  src={slides[currentSlide].thumbnail}
                  alt={slides[currentSlide].judul}
                  fill
                  className="object-cover"
                  priority={true}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-20">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/10 mb-4">
                        Featured Program
                      </span>
                      <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 max-w-4xl tracking-tight leading-tight">
                        {slides[currentSlide].judul}
                      </h2>
                      <p className="text-lg text-white/80 max-w-2xl line-clamp-2 md:line-clamp-3 mb-8 text-shadow-sm font-medium">
                        {slides[currentSlide].deskripsi}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optional: Pagination Dots for feedback */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-12"
                  : "bg-white/40 w-4 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="container mx-auto px-6 py-32">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            All Programs.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {program.map((data, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-white border border-neutral-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <Image
                  src={data.thumbnail}
                  alt={data.judul}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-none bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <Play fill="currentColor" size={20} className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-4 px-1">
                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {data.judul}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {data.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
