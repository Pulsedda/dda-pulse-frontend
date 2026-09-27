import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_BACKEND = "https://dda-pulse.onrender.com";

export async function GET() {
  const base = (process.env.BACKEND_URL || FALLBACK_BACKEND).replace(/\/+$/, "");
  const url = `${base}/api/dashboard`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "DDA-Pulse-Frontend/1.0.3"
      }
    });

    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Backend request failed"
      },
      { status: 502 }
    );
  }
}
