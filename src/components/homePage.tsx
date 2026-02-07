"use client";

import { About } from "@/components/about";
import { CarouselCompanyLogo } from "@/components/carouselCompanyLogo";
import { OurExpertise } from "@/components/ourExpertise";
import { Program } from "@/components/program";
import Schedule from "@/components/schedule";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import { useEffect, useState } from "react";
import { ImmersiveHero } from "@/components/ui/ImmersiveHero";
import { BentoNewsGrid } from "@/components/ui/BentoNewsGrid";
import { ProgramScheduleBar } from "@/components/ui/ProgramScheduleBar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Inewsdata {
  id: number;
  judul: string;
  deskripsi: string;
  waktu: string;
  kategori: Ikategori;
  cover: string;
}
interface Ikategori {
  id_kategori: number;
  nama: string;
  slug: string;
  top_nav: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function HomePage() {
  const [newsdatas, setNewsdatas] = useState<Inewsdata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchWithFallback<{ data: Inewsdata[] }>(
        `${BASE_URL}/berita`,
        "/data/berita.json",
      );
      if (data?.data) {
        setNewsdatas(data.data);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-primary font-bold tracking-widest animate-pulse">
        LOADING...
      </div>
    );
  }

  // Ensure we have at least 1 item
  if (newsdatas.length === 0) {
    return null;
  }

  const featuredNews = newsdatas[0];
  const latestNews = newsdatas.slice(1, 6);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* 1. IMMERSIVE HERO SECTION */}
      {/* 1. IMMERSIVE HERO SECTION */}
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full flex flex-col md:block h-auto md:h-screen">
        <div className="relative w-full aspect-video md:aspect-auto md:h-full">
          <ImmersiveHero
            slides={[
              {
                id: 101,
                cover:
                  "https://storage.tvku.tv/tvkuweb/v2/assets/slider_home/2025-12-12-03-12-09.webp",
                title: "Semarang Hebat",
              },
              {
                id: 102,
                cover:
                  "https://storage.tvku.tv/tvkuweb/v2/assets/slider_home/2025-12-12-03-13-56.webp",
                title: "TVKU Official",
              },
              {
                id: 103,
                cover:
                  "https://storage.tvku.tv/tvkuweb/v2/assets/slider_home/2025-12-12-03-02-34.webp",
                title: "Campus Digital",
              },
              {
                id: 104,
                cover:
                  "https://storage.tvku.tv/tvkuweb/v2/assets/slider_home/2025-12-12-04-42-07.webp",
                title: "Creative Hub",
              },
              {
                id: 105,
                cover:
                  "https://storage.tvku.tv/tvkuweb/v2/assets/slider_home/2025-12-12-04-45-55.webp",
                title: "Broadcasting Future",
              },
            ]}
          />
        </div>

        {/* SCHEDULE BAR (Static below on Mobile, Overlay at Bottom on Desktop) */}
        <div className="relative md:absolute md:bottom-0 left-0 w-full z-40 px-4 py-6 md:pb-10 -mt-12 md:mt-0">
          <div className="container mx-auto shadow-2xl rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20">
              <ProgramScheduleBar />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST STORIES (Bento Grid) */}
      <section className="container mx-auto px-6 py-16 md:py-32">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Latest Stories.
            </h2>
            <p className="text-xl text-neutral-500 font-medium">
              Curated news tailored for you.
            </p>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            View All News{" "}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <BentoNewsGrid
          news={latestNews.length > 0 ? latestNews : newsdatas.slice(0, 4)}
        />
      </section>

      {/* 4. PROGRAMS (Carousel) */}
      <section className="bg-neutral-100 py-16 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
                Featured Programs.
              </h2>
              <p className="text-xl text-neutral-500 font-medium max-w-2xl">
                Watch your favorite shows, exclusively on TVKU.
              </p>
            </div>

            <Link
              href="/programPage"
              className="group flex items-center gap-1 text-primary font-semibold hover:underline hidden md:flex"
            >
              View All Programs{" "}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <Program />
          </div>
        </div>
      </section>

      {/* 6. PARTNERS (Carousel) */}
      <section className="py-16 md:py-32 border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-6 text-left">
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
              Trusted Partners.
            </h2>
            <p className="text-xl text-neutral-500 font-medium max-w-2xl">
              Collaborating with leading institutions to drive innovation.
            </p>
          </div>
          <CarouselCompanyLogo />
        </div>
      </section>

      {/* 7. ABOUT & EXPERTISE */}
      <section className="bg-neutral-50 py-16 md:py-32">
        <div className="container mx-auto px-6 space-y-16">
          {/* About */}
          <div className="text-left">
            <About />
          </div>

          {/* Expertise */}
          <div className="text-left">
            <OurExpertise />
          </div>
        </div>
      </section>
    </div>
  );
}
