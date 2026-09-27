const BASE = (process.env.BACKEND_URL || "https://dda-pulse.onrender.com").replace(/\/+$/, "");

export async function api(path: string, init?: RequestInit) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const url = `${BASE}${clean}`;
  const response = await fetch(url, { ...init, cache: "no-store" });
  const text = await response.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${clean}${data?.error ? ` — ${data.error}` : ""}`);
  }
  return data;
}

export const backendUrl = BASE;
