import { api } from "@/lib/api";
export const dynamic = "force-dynamic";
function iso(d:Date){return d.toISOString().slice(0,10)}
export default async function Page(){
  const to=new Date(); const from=new Date(to); from.setUTCDate(from.getUTCDate()-6);
  try{
    const d=await api(`/api/calendar?from=${iso(from)}&to=${iso(to)}`);
    const brokers=d?.brokers||[];
    return <><div className="top"><div><h1>Calendar</h1><p>Daily publication status · Dubai</p></div></div><div className="section"><div className="card"><b>{iso(from)} — {iso(to)}</b><p>GREEN = qualifying Reel · YELLOW = published but not qualifying · RED = closed monitoring day without publication · PRE_LAUNCH = before 01 Oct 2026.</p></div>{brokers.length?<BrokerCalendar brokers={brokers}/>:<div className="card">No calendar rows for this period.</div>}</div></>;
  }catch(e:any){return <><div className="top"><div><h1>Calendar</h1></div></div><div className="card"><b>Backend connection error</b><p>{e.message}</p></div></>}
}
function BrokerCalendar({brokers}:{brokers:any[]}){return <div className="section">{brokers.map((b:any,i:number)=><div className="card" key={b.id||b.username||i}><b>{b.fullName||b.name||b.username||"Broker"}</b><p>{(b.days||[]).map((x:any)=>`${x.date}: ${x.status}`).join(" · ")||"No day data"}</p></div>)}</div>}
