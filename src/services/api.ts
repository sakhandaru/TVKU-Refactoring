import { fetchWithFallback } from "@/lib/fetchWithFallback";

// URL API diambil dari .env
// Jika .env tidak ada, default ke string kosong (atau bisa throw error)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Service standard untuk mengambil data dari TVKU API.
 * Menggunakan fetchWithFallback untuk otomatis pindah ke data dummy (mocks)
 * jika API utama gagal/down.
 */
export const apiService = {
  /**
   * Mengambil list berita
   * @param page Halaman yang diambil (pagination)
   */
  getBerita: async (page = 1) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/berita?page=${page}`,
      "/data/berita.json" // Fallback data
    );
  },

  /**
   * Mengambil detail berita berdasarkan slug/id
   */
  getBeritaDetail: async (slug: string) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/berita/${slug}`,
      "/data/berita.json" // Fallback to general news if specific detail fails
    );
  },

  /**
   * Mengambil list program
   */
  getPrograms: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/program`,
      "/data/our-programs.json"
    );
  },

  /**
   * Mengambil data schedule/jadwal tayang
   */
  getSchedule: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/jadwal`,
      "/data/schedule.json"
    );
  },
};
