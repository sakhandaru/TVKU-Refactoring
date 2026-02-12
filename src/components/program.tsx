"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { usePrograms } from "@/hooks/usePrograms";

import "swiper/css";
import "swiper/css/navigation";

export const Program = () => {
  const { data: programs = [], isLoading: loading, error } = usePrograms();

  if (loading) {
    return (
      <div className="container mx-auto mt-15 flex justify-center items-center h-40">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) return null;

  return (
    <div className="w-full">
      <div className="relative group/slider">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 3.2, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 32 },
          }}
          navigation={{
            nextEl: ".program-next",
            prevEl: ".program-prev",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="!pb-10" // Space for shadows
        >
          {programs.map((program) => (
            <SwiperSlide key={program.id}>
              <div className="group relative rounded-none overflow-hidden bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full">
                {/* Image Aspect Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={program.thumbnail}
                    alt={program.judul}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={program.id === programs[0]?.id}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center border border-white/30 text-white shadow-lg">
                      <Play fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm rounded-none border border-white/10">
                      Show
                    </span>
                    <h3 className="font-bold text-xl md:text-2xl leading-tight mb-1 line-clamp-2">
                      {program.judul}
                    </h3>
                    <p className="text-sm text-neutral-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {program.deskripsi}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Apple Style) */}
        <button
          aria-label="Previous program"
          className="program-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-none flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20 hover:scale-110 shadow-lg cursor-pointer disabled:opacity-0"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next program"
          className="program-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-none flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20 hover:scale-110 shadow-lg cursor-pointer disabled:opacity-0"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
