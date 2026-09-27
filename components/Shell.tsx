"use client";
import Link from"next/link";
import{usePathname}from"next/navigation";
import{useEffect,useState}from"react";
import{useApp}from"./AppProvider";

const nav=[["/","dashboard"],["/calendar","calendar"],["/rankings","rankings"],["/brokers","brokers"],["/settings","settings"]];

export default function Shell({children}:{children:React.ReactNode}){
  const p=usePathname(),{lang,setLang,dark,setDark,t}=useApp();
  const[menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>setMenuOpen(false),[p]);
  useEffect(()=>{
    document.body.style.overflow=menuOpen?"hidden":"";
    return()=>{document.body.style.overflow=""};
  },[menuOpen]);

  return <div className="shell">
    <aside>
      <div className="mobileTop">
        <div className="brand">
          <div className="logo"><b>DDA</b></div>
          <div><strong>DDA Pulse</strong><span>Social Media KPI</span></div>
        </div>
        <button className={"hamburger "+(menuOpen?"open":"")} aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>
          <i/><i/><i/>
        </button>
      </div>
      <nav className={menuOpen?"mobileOpen":""}>
        {nav.map(x=><Link className={p===x[0]?"active":""} href={x[0]} key={x[0]}>{t(x[1])}</Link>)}
      </nav>
      <div className="monitor"><i/>DDA Pulse</div>
    </aside>
    {menuOpen&&<button className="menuBackdrop" aria-label="Close menu" onClick={()=>setMenuOpen(false)}/>}
    <main>
      <header><div/><div className="tools">
        <button className={!dark?"sel":""} onClick={()=>setDark(false)}>☀</button>
        <button className={dark?"sel":""} onClick={()=>setDark(true)}>☾</button>
        <span/>
        <button className={lang==="ru"?"sel":""} onClick={()=>setLang("ru")}>RU</button>
        <button className={lang==="en"?"sel":""} onClick={()=>setLang("en")}>ENG</button>
      </div></header>
      {children}
    </main>
  </div>
}