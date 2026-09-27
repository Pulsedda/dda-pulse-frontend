import { api } from "@/lib/api";
import BrokerTable from "@/components/BrokerTable";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const d = await api("/api/dashboard");
    const brokers = d?.brokers || [];
    return <>
      <div className="top"><div><h1>Dashboard</h1><p>DDA broker content performance · Dubai</p></div><span className="pill">● Monitoring active</span></div>
      <div className="cards">
        <div className="card">Active brokers<strong>{brokers.length}</strong></div>
        <div className="card">Weekly KPI met<strong>{brokers.filter((x:any)=>x.week?.met).length}/{brokers.length}</strong></div>
        <div className="card">Green today<strong>{brokers.filter((x:any)=>x.today==="GREEN").length}</strong></div>
        <div className="card">Official start<strong style={{fontSize:18}}>01 Oct 2026</strong></div>
      </div>
      <div className="section"><h2>Broker performance</h2><BrokerTable brokers={brokers}/></div>
    </>;
  } catch (e:any) {
    return <><div className="top"><div><h1>Dashboard</h1><p>DDA Pulse monitoring overview</p></div></div><div className="card"><b>Backend connection error</b><p>{e?.message || "Unknown error"}</p></div></>;
  }
}
