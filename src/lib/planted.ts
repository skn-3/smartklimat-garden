import { useEffect, useState } from "react";

/** Fallback tills stats-endpointen svarar (matchar tidigare hårdkodat värde). */
export const PLANTED_FALLBACK = 27393;

const STATS_URL = "https://yakwdirpbwdtsdpxlbkp.supabase.co/functions/v1/public-stats";

/** Hämtar trees_total från appens public-stats-funktion. Faller tillbaka på PLANTED_FALLBACK. */
export function usePlantedTotal(): number {
  const [total, setTotal] = useState<number>(PLANTED_FALLBACK);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(STATS_URL, { headers: { accept: "application/json" } });
        if (!res.ok) return;
        const data = (await res.json()) as { trees_total?: number };
        if (!cancelled && typeof data.trees_total === "number" && data.trees_total > 0) {
          setTotal(data.trees_total);
        }
      } catch {
        /* behåll fallback */
      }
    })();
    return () => { cancelled = true; };
  }, []);
  return total;
}
