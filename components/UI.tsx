"use client";import{useApp}from"./AppProvider";
export function Title({title,sub}:{title:string;sub:string}){const{t}=useApp();return <div className="title"><div className="eyebrow">DDA REAL ESTATE</div><h1>{t(title)}</h1><p>{t(sub)}</p></div>}
export const fmt=(n:number|null|undefined)=>n==null?"—":new Intl.NumberFormat("en-US").format(n);
export const dateFmt=(s:string|null|undefined)=>{if(!s)return"—";const m=s.slice(0,10).match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[3]}.${m[2]}.${m[1]}`:s};
export const isoFromDisplay=(s:string)=>{const m=s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);return m?`${m[3]}-${m[2]}-${m[1]}`:""};
export const statusLabel=(s:string,lang:string)=>{const x:any={ru:{WHITE:"БЕЛЫЙ",GREEN:"ЗЕЛЁНЫЙ",YELLOW:"ЖЁЛТЫЙ",RED:"КРАСНЫЙ",PRE_LAUNCH:"ДО ЗАПУСКА"},en:{WHITE:"WHITE",GREEN:"GREEN",YELLOW:"YELLOW",RED:"RED",PRE_LAUNCH:"PRE LAUNCH"}};return x[lang]?.[s]||s};
