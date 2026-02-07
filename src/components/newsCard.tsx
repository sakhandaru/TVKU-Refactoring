import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  cover: string;
  judul: string;
  deskripsi: string;
  waktu?: string;
  kategori?: {
    nama: string;
    slug: string;
  };
}

export default function NewsCard({
  cover,
  judul,
  deskripsi,
  waktu,
  kategori,
}: NewsCardProps) {
  return (
    <Link href="#" className="group block h-full">
      <div className="relative h-full flex flex-col overflow-hidden rounded-none bg-white shadow-sm border border-neutral-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={cover}
            alt={judul}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-semibold rounded-none text-neutral-900 shadow-sm">
              {kategori?.nama || "News"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {waktu || "Just Now"}
          </div>

          <h3 className="mb-2 text-xl font-bold leading-tight text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
            {judul}
          </h3>
          <p className="mb-4 flex-1 text-sm text-neutral-500 line-clamp-3 leading-relaxed">
            {deskripsi}
          </p>

          <div className="mt-auto flex items-center text-sm font-semibold text-primary">
            Read Story{" "}
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
