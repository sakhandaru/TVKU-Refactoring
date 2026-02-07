"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fetchWithFallback } from "@/lib/fetchWithFallback";

interface Iexpertise1 {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
}

interface Iexpertise2 {
  id: number;
  thumbnail: string;
  judul: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const OurExpertise = () => {
  const [expertise1, setExpertise1] = useState<Iexpertise1[]>([]);
  const [expertise2, setExpertise2] = useState<Iexpertise2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [result1, result2] = await Promise.all([
          fetchWithFallback<{ data: Iexpertise1[] }>(
            `${BASE_URL}/home/our-expertise1`,
            "/data/our-expertise1.json",
          ),
          fetchWithFallback<{ data: Iexpertise2[] }>(
            `${BASE_URL}/home/our-expertise2`,
            "/data/our-expertise2.json",
          ),
        ]);
        if (result1.data?.data) setExpertise1(result1.data.data);
        if (result2.data?.data) setExpertise2(result2.data.data);
      } catch (error) {
        console.error("Error fetching expertise data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-24 text-left">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
          World-Class Expertise.
        </h2>
        <p className="text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl">
          We bring together creativity and technology to deliver exceptional
          broadcasting experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-900 border-b border-neutral-800">
        {expertise1.map((item, idx) => (
          <div
            key={item.id}
            className={`group relative h-[500px] overflow-hidden rounded-none border-neutral-800 ${
              idx % 2 === 0 ? "md:border-r" : ""
            }`}
          >
            <Image
              src={item.thumbnail}
              alt={item.judul}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors" />
            <div className="absolute bottom-0 left-0 p-12 w-full">
              <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">
                {item.judul}
              </h3>
              <p className="text-lg text-neutral-300 leading-relaxed max-w-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {item.deskripsi}
              </p>
            </div>
            {/* Hover Icon */}
            <div className="absolute top-12 right-12 text-white/50 group-hover:text-white transition-colors">
              <ArrowUpRight size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-l border-neutral-800 bg-neutral-900">
        {expertise2.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-none border-r border-b border-neutral-800 cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300"
          >
            <Image
              src={item.thumbnail}
              alt={item.judul}
              fill
              className="object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-500 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 flex items-end p-8">
              <span className="text-xl font-bold text-white tracking-tight leading-none group-hover:-translate-y-2 transition-transform duration-300">
                {item.judul}
              </span>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-50 transition-opacity">
              <ArrowUpRight size={20} className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
