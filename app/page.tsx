"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const result = await api("/api/dashboard");
        setData(result);
        setError("");
      } catch (e: any) {
        setError(e?.message || "Failed to load dashboard.");
      }
    }

    void loadDashboard();
  }, []);

  if (error) {
    return (
      <div>
        <div className="top">
          <div>
            <h1>Dashboard</h1>
            <p>DDA Pulse monitoring overview</p>
          </div>
        </div>
        <div className="card">
          <h3>Backend connection error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="top">
          <div>
            <h1>Dashboard</h1>
            <p>DDA Pulse monitoring overview</p>
          </div>
        </div>
        <div className="card">
          <p>Loading DDA Pulse...</p>
        </div>
      </div>
    );
  }

  const brokers = data?.brokers || [];

  return (
    <div>
      <div className="top">
        <div>
          <h1>Dashboard</h1>
          <p>DDA Pulse monitoring overview</p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <p>Active Brokers</p>
          <h2>{brokers.length}</h2>
        </div>

        <div className="card">
          <p>Weekly KPI</p>
          <h2>3 Reels</h2>
        </div>

        <div className="card">
          <p>Monthly KPI</p>
          <h2>12 Reels</h2>
        </div>

        <div className="card">
          <p>Quarter KPI</p>
          <h2>36 Reels</h2>
        </div>
      </div>

      <div className="section">
        <div className="card">
          <h2>Broker Performance</h2>
          <p>
            Official KPI monitoring starts on 1 October 2026.
            Pre-launch data is not counted toward KPI.
          </p>

          {brokers.length === 0 ? (
            <p>No brokers found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "12px" }}>Broker</th>
                    <th style={{ textAlign: "left", padding: "12px" }}>Week</th>
                    <th style={{ textAlign: "left", padding: "12px" }}>Month</th>
                    <th style={{ textAlign: "left", padding: "12px" }}>Quarter</th>
                  </tr>
                </thead>
                <tbody>
                  {brokers.map((broker: any, index: number) => (
                    <tr key={broker.username || index}>
                      <td style={{ padding: "12px" }}>
                        {broker.firstName || broker.username || "Broker"}{" "}
                        {broker.lastName || ""}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {broker.weekGreen ?? broker.weekCount ?? 0}/3
                      </td>
                      <td style={{ padding: "12px" }}>
                        {broker.monthGreen ?? broker.monthCount ?? 0}/12
                      </td>
                      <td style={{ padding: "12px" }}>
                        {broker.quarterGreen ?? broker.quarterCount ?? 0}/36
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
