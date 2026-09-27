import DashboardClient from "@/components/DashboardClient";

export default function DashboardPage() {
  return (
    <>
      <div className="top">
        <div>
          <div className="eyebrow">DDA REAL ESTATE</div>
          <h1>Dashboard</h1>
          <p>Instagram KPI monitoring overview</p>
        </div>
        <div className="launch">Official KPI start · 01 Oct 2026</div>
      </div>
      <DashboardClient />
    </>
  );
}
