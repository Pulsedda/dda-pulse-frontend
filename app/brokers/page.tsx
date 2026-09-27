import { api } from "@/lib/api";
import BrokerTable from "@/components/BrokerTable";
export const dynamic = "force-dynamic";
export default async function Page(){try{const d=await api("/api/dashboard");const brokers=d?.brokers||[];return <><div className="top"><div><h1>Brokers</h1><p>Instagram monitoring profiles</p></div></div><div className="section"><BrokerTable brokers={brokers}/></div><div className="card"><b>Management controls</b><p>Add / activate / deactivate controls will be enabled together with authorization, so public users cannot change the broker list.</p></div></>}catch(e:any){return <><div className="top"><div><h1>Brokers</h1></div></div><div className="card"><b>Backend connection error</b><p>{e.message}</p></div></>}}
