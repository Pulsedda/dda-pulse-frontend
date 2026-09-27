"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/lib/client-api";
import type { DashboardResponse } from "@/lib/types";
import StatusPill from "./StatusPill";

function fmtFollowers(n: number) {
  return new Intl.NumberFormat("en-US").format(n || 0);
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getDashboard();
        if (!cancelled) {
          setData(result);
          setError("");
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div className="card"><div className="loading">Loading DDA Pulse…</div></div>;
  }

  if (error || !data) {
    return (
      <div className="card errorCard">
        <strong>Backend connection error</strong>
        <p>{error || "No dashboard data returned."}</p>
      </div>
    );
  }

  const totalFollowers = data.brokers.reduce((sum, b) => sum + (b.followers || 0), 0);
  const scanned = data.brokers.filter(b => b.lastScanStatus === "SUCCESS").length;

  return (
    <>
      <section className="stats">
        <div className="stat"><span>Brokers</span><strong>{data.brokerCount}</strong><small>active monitoring profiles</small></div>
        <div className="stat"><span>Successful scans</span><strong>{scanned}/{data.brokerCount}</strong><small>latest scan status</small></div>
        <div className="stat"><span>Total followers</span><strong>{fmtFollowers(totalFollowers)}</strong><small>across monitored profiles</small></div>
        <div className="stat"><span>Today</span><strong className="smallStrong">{data.todayDubai}</strong><small>{data.timezone}</small></div>
      </section>

      <section className="card">
        <div className="sectionHead">
          <div><h2>Broker performance</h2><p>Official KPI: Week 3 · Month 12 · Quarter 36</p></div>
          <StatusPill value={data.brokers[0]?.today || "PRE_LAUNCH"} />
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Broker</th><th>Followers</th><th>Today</th>
                <th>Week</th><th>Month</th><th>Quarter</th><th>Scan</th>
              </tr>
            </thead>
            <tbody>
              {data.brokers.map(b => (
                <tr key={b.username}>
                  <td>
                    <a className="brokerLink" href={b.instagramUrl} target="_blank" rel="noreferrer">
                      <b>{b.displayName || b.instagramFullName || b.username}</b>
                      <span>@{b.username}</span>
                    </a>
                  </td>
                  <td>{fmtFollowers(b.followers)}</td>
                  <td><StatusPill value={b.today} /></td>
                  <td><b>{b.week.green}</b>/{b.week.target}</td>
                  <td><b>{b.month.green}</b>/{b.month.target}</td>
                  <td><b>{b.quarter.green}</b>/{b.quarter.target}</td>
                  <td><StatusPill value={b.lastScanStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
