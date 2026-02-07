import { useQuery } from "@tanstack/react-query";
import { fetchWithFallback } from "@/lib/fetchWithFallback";

export interface Iprogram {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const fetchPrograms = async (): Promise<Iprogram[]> => {
  const { data, error } = await fetchWithFallback<{ data: Iprogram[] }>(
    `${BASE_URL}/our-programs`,
    "/data/our-programs.json"
  );

  if (error) {
    throw new Error(error);
  }

  return data?.data || [];
};

export const usePrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: fetchPrograms,
  });
};
