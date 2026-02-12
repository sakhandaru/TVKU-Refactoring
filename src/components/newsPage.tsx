"use client";

import { useEffect, useState } from "react";
import { fetchWithFallback } from "@/lib/fetchWithFallback";
import { MultiTabContent } from "./multiTabContent";
import { BentoNewsGrid } from "@/components/ui/BentoNewsGrid";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Inewsdata {
  id: number;
  judul: string;
  deskripsi: string;
  waktu: string;
  kategori: Ikategori;
  cover: string;
  path_media: string;
  link: string;
}

interface Ikategori {
  id_kategori: number;
  nama: string;
  slug: string;
  top_nav: string;
  urutan: number;
}

interface ApiResponse {
  current_page: number;
  last_page: number;
  data: Inewsdata[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function NewsPage() {
  const [newsData, setNewsData] = useState<Inewsdata[]>([]);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [kategoriData, setKategoriData] = useState<Ikategori[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [latestNewsResult, newsResult, kategoriResult] =
          await Promise.all([
            fetchWithFallback<{ data: Inewsdata[] }>(
              `${BASE_URL}/berita?per_page=5`,
              "/data/berita.json",
            ),
            fetchWithFallback<ApiResponse>(
              `${BASE_URL}/berita?current_page=${currentPage}`,
              "/data/berita.json",
            ),
            fetchWithFallback<{ data: Ikategori[] }>(
              `${BASE_URL}/kategori`,
              "/data/kategori.json",
            ),
          ]);

        if (latestNewsResult.data?.data)
          setNewsData(latestNewsResult.data.data);
        if (newsResult.data) setApiData(newsResult.data);
        if (kategoriResult.data?.data)
          setKategoriData(kategoriResult.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!loading && (!apiData || !apiData.data.length)) {
    return (
      <div className="flex justify-center items-center h-screen text-neutral-500">
        No news data available
      </div>
    );
  }

  const beritaData = apiData?.data || [];
  const last_page = apiData?.last_page || 1;

  // Simple Pagination Logic (same as before but cleaner code if possible, sticking to original logic for safety)
  const getPaginationItems = () => {
    // (Keeping original logic for brevity, assuming standard component handles visuals)
    const items = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (last_page <= maxVisiblePages) {
      startPage = 1;
      endPage = last_page;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= last_page) {
        startPage = last_page - maxVisiblePages + 1;
        endPage = last_page;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
        />
      </PaginationItem>,
    );

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={1 === currentPage}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2)
        items.push(
          <PaginationItem key="e1">
            <PaginationEllipsis />
          </PaginationItem>,
        );
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < last_page) {
      if (endPage < last_page - 1)
        items.push(
          <PaginationItem key="e2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      items.push(
        <PaginationItem key={last_page}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(last_page);
            }}
            isActive={last_page === currentPage}
          >
            {last_page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < last_page) handlePageChange(currentPage + 1);
          }}
          className={
            currentPage === last_page ? "opacity-50 cursor-not-allowed" : ""
          }
        />
      </PaginationItem>,
    );
    return items;
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-32 pt-28 md:pt-40">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-16 space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Newsroom.
          </h1>
          <p className="text-xl text-neutral-500 font-medium max-w-2xl">
            Get the latest insights, culture, and breaking news from UDINUS.
          </p>
        </div>

        {/* Featured Section (Bento Grid) */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
              Trending Now
            </h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-neutral-200 animate-pulse rounded-none ${
                    i === 0 || i === 4 ? "md:col-span-2" : "md:col-span-1"
                  } ${i === 2 ? "md:row-span-2" : ""}`}
                />
              ))}
            </div>
          ) : (
            <BentoNewsGrid news={newsData.slice(0, 5)} />
          )}
        </div>

        {/* All News (MultiTab) */}
        <div className="space-y-8">
          <div className="border-b border-neutral-200 pb-4 mb-8">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Latest Stories.
            </h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-neutral-200 animate-pulse w-full rounded-md"
                />
              ))}
            </div>
          ) : (
            <MultiTabContent categories={kategoriData} newsData={beritaData} />
          )}

          <div className="mt-16 flex justify-center">
            <Pagination>
              <PaginationContent>{getPaginationItems()}</PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
