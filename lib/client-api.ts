import type { DashboardResponse } from "./types";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch("/api/dashboard", {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" }
  });

  const text = await response.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!response.ok) {
    const detail =
      data && typeof data === "object"
        ? data.error || data.message || data.detail
        : data;
    throw new Error(`HTTP ${response.status}${detail ? ` — ${String(detail).slice(0, 160)}` : ""}`);
  }

  return data as DashboardResponse;
}
