import axios from "axios";

export interface FetchResult<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

/**
 * Fetches data from a URL with a fallback to a local JSON file.
 * @param url The primary API URL.
 * @param fallbackPath The local path to the fallback JSON file (relative to public/).
 * @returns Object containing data, error, and isFallback flag.
 */
export async function fetchWithFallback<T>(
  url: string,
  fallbackPath: string
): Promise<FetchResult<T>> {
  try {
    const response = await axios.get<T>(url, { timeout: 300 }); // Reduced timeout for faster dev (was 1000)
    
    // Axios throws on 4xx/5xx by default, so we usually land here only on 2xx
    // But we double check data validity if needed.
    if (response.status >= 200 && response.status < 300) {
        return { data: response.data, error: null, isFallback: false };
    }
    throw new Error(`API returned status ${response.status}`);

  } catch (apiError) {
    console.warn(`[FetchWithFallback] API failed for ${url}:`, apiError);
    console.info(`[FetchWithFallback] Attempting fallback to ${fallbackPath}`);

    try {
      // In Next.js, public folder content is served at root.
      // So /public/data/foo.json is accessible via /data/foo.json
      const fallbackResponse = await axios.get<T>(fallbackPath);
      return { data: fallbackResponse.data, error: null, isFallback: true };
    } catch (fallbackError) {
      console.error(`[FetchWithFallback] Fallback failed for ${fallbackPath}:`, fallbackError);
      return { 
        data: null, 
        error: "Both API and Fallback failed.", 
        isFallback: false 
      };
    }
  }
}
