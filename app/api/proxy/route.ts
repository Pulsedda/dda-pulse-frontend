import{NextRequest,NextResponse}from"next/server";
export const dynamic="force-dynamic";
const FALLBACK="https://dda-pulse.onrender.com";
async function go(req:NextRequest){
 const p=req.nextUrl.searchParams.get("path");if(!p||!p.startsWith("/api/"))return NextResponse.json({error:"Invalid API path"},{status:400});
 const base=(process.env.BACKEND_URL||FALLBACK).replace(/\/+$/,'');
 try{
  const body=["GET","HEAD"].includes(req.method)?undefined:await req.text();
  const headers:Record<string,string>={"Content-Type":"application/json","Accept":"application/json","User-Agent":"DDA-Pulse-Frontend/2.5"};
  const cookie=req.headers.get("cookie");if(cookie)headers["Cookie"]=cookie;
  const r=await fetch(base+p,{method:req.method,body:body||undefined,cache:"no-store",headers});
  const out=new NextResponse(await r.text(),{status:r.status,headers:{"Content-Type":r.headers.get("content-type")||"application/json","Cache-Control":"no-store"}});
  const setCookie=r.headers.get("set-cookie");if(setCookie)out.headers.set("set-cookie",setCookie);
  return out;
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Backend error"},{status:502})}
}
export{go as GET,go as POST,go as PUT,go as PATCH,go as DELETE};
