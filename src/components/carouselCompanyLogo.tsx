"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

export const CarouselCompanyLogo = () => {
  const partners = [
    {
      name: "UIN WS",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/uin.webp",
    },
    {
      name: "YPKPI MRB",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/ypkpi_mrb.webp",
    },
    {
      name: "Bank Jateng",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/bjateng.webp",
    },
    {
      name: "BNN",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/bnn.webp",
    },
    {
      name: "PBESI",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/esport.webp",
    },
    {
      name: "Majelis Ulama Indonesia",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/halal.webp",
    },
    {
      name: "Kominfo",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/kominfo.webp",
    },
    {
      name: "Kemenkumham",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/kemenkumham.webp",
    },
    {
      name: "Komnas Anak",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/komnasanak.webp",
    },
    {
      name: "Komnas HAM",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/komnasham.webp",
    },
    {
      name: "MAJT",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/majt.webp",
    },
    {
      name: "Perhimpunan Dokter",
      logo: "https://tvku.tv/beranda/assets/kerjasamaygterjalin/perhimpunandokter.webp",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // Tablet
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          // Desktop
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          // Large Desktop
          1280: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 0, // Continuous slide
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        speed={5000} // Speed for linear movement
        className="py-8 [&_.swiper-wrapper]:!ease-linear"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="relative w-full aspect-[3/2] flex items-center justify-center p-4 transition-all duration-300 hover:scale-110">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-contain" // removed max-h constraint to rely on container
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
