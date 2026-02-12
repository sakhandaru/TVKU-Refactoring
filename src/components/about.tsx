"use client";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
// Card component removed
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Iabout {
  id: number;
  judul: number;
  deskripsi: string;
  gambar: string;
  motto1: string;
  motto2: string;
  motto3: string;
  motto1sub: string;
  motto2sub: string;
  motto3sub: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const About = () => {
  const [abouts, setAbout] = useState<Iabout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error: fetchError } = await fetchWithFallback<{
        data: Iabout[];
      }>(`${BASE_URL}/home/who-we-are`, "/data/who-we-are.json");

      if (data?.data) {
        setAbout(data.data);
      } else if (fetchError) {
        setError(fetchError);
      }
    };

    fetchAbout();
  }, []);

  if (error) {
    return (
      <div className="w-full mt-15">
        <h1 className="text-2xl md:text-4xl font-bold">About</h1>
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {abouts.map((about) => (
        <div key={about.id} className="w-full">
          {/* Section 1: The Story (Apple Style Header) */}
          <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
            <div className="w-full lg:w-1/2 space-y-4 pt-4 text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                Our Story.
              </h2>
              <p className="text-xl text-neutral-500 font-medium leading-relaxed">
                {about.judul}
              </p>
              <div className="w-full h-px bg-neutral-900/10 my-8"></div>
              <p className="text-sm text-neutral-600 leading-relaxed font-medium text-left">
                {about.deskripsi}
              </p>
              <div className="pt-4">
                <button className="group inline-flex items-center gap-2 text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Read Full History
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Image Side - Sharp & Flat */}
            <div className="w-full lg:w-1/2 relative aspect-[4/3] bg-neutral-100">
              <Image
                src={about.gambar || "/images/fotogedung.jpg"}
                alt="Gedung TVKU"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Section 2: Core Values (Grid Lines, No Shadows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-neutral-200">
            {/* Value 1 */}
            <div className="group border-b md:border-b-0 md:border-r border-neutral-200 p-8 lg:p-12 hover:bg-neutral-50 transition-colors duration-500">
              <span className="block text-6xl font-bold text-blue-500 mb-6">
                1.
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight uppercase">
                {about.motto1}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {about.motto1sub}
              </p>
            </div>

            {/* Value 2 */}
            <div className="group border-b md:border-b-0 md:border-r border-neutral-200 p-8 lg:p-12 hover:bg-neutral-50 transition-colors duration-500">
              <span className="block text-6xl font-bold text-blue-500 mb-6">
                2.
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight uppercase">
                {about.motto2}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {about.motto2sub}
              </p>
            </div>

            {/* Value 3 */}
            <div className="group p-8 lg:p-12 hover:bg-neutral-50 transition-colors duration-500">
              <span className="block text-6xl font-bold text-blue-500 mb-6">
                3.
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight uppercase">
                {about.motto3}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {about.motto3sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
