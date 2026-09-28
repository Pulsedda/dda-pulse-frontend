"use client";
import{useEffect,useState}from"react";import{api}from"@/lib/api";import{useApp}from"@/components/AppProvider";

function pageName(path:string,lang:string){
 const ru=lang==="ru";
 const map:any={"/":ru?"Главная / Dashboard":"Dashboard","/calendar":ru?"Календарь":"Calendar","/rankings":ru?"Рейтинги":"Rankings","/brokers":ru?"Брокеры":"Brokers","/settings":ru?"Настройки":"Settings","/developer":ru?"Панель разработчика":"Developer panel"};
 return map[path]||path;
}
function humanEvent(x:any,lang:string){
 const ru=lang==="ru",e=x.eventType,a=x.action,p=x.path||"";
 if(e==="VISIT"&&a==="PAGE_VIEW")return ru?`Открыл раздел «${pageName(p,lang)}»`:`Opened “${pageName(p,lang)}”`;
 if(e==="LOGIN"&&a==="SUCCESS")return ru?"Вошёл в аккаунт":"Logged in";
 if(e==="LOGIN"&&a==="FAILED")return ru?"Неудачная попытка входа":"Failed login attempt";
 if(e==="LOGOUT"&&a==="SUCCESS")return ru?"Вышел из аккаунта":"Logged out";
 if(e==="CHANGE"&&a==="CREATE_ADMIN")return ru?"Создал нового администратора":"Created a new administrator";
 if(e==="CHANGE"&&a==="UPDATE_ADMIN")return ru?"Изменил аккаунт администратора":"Changed an administrator account";
 if(e==="CHANGE"){
   const verb:any={POST:ru?"Добавил / запустил действие":"Added / started an action",PUT:ru?"Изменил данные":"Changed data",DELETE:ru?"Удалил данные":"Deleted data"};
   let area=pageName(p,lang);
   if(p.includes("/brokers"))area=ru?"Брокеры":"Brokers";else if(p.includes("/settings"))area=ru?"Настройки":"Settings";else if(p.includes("/departments"))area=ru?"Отделы":"Departments";else if(p.includes("/managers"))area=ru?"Руководители":"Managers";else if(p.includes("/calendar"))area=ru?"Календарь / ручная корректировка":"Calendar / manual override";else if(p.includes("/scanner"))area=ru?"Сканирование":"Scanning";
   return `${verb[a]|| (ru?"Внёс изменение":"Made a change")} — ${area}`;
 }
 return `${e} · ${a}`;
}
function humanUser(x:any,lang:string){if(x.username)return x.username;return lang==="ru"?"Гость (без входа)":"Guest (not logged in)"}
function humanDetails(x:any,lang:string){const ru=lang==="ru";if(x.eventType==="VISIT")return ru?"Просмотр страницы":"Page view";if(x.eventType==="LOGIN"&&x.action==="SUCCESS")return ru?"Авторизация успешна":"Login successful";if(x.eventType==="LOGOUT")return ru?"Сессия завершена":"Session ended";if(x.details?.startsWith("Created admin:"))return (ru?"Создан аккаунт: ":"Account created: ")+x.details.split(":").slice(1).join(":").trim();if(x.details?.startsWith("Updated admin:"))return (ru?"Изменён аккаунт: ":"Account changed: ")+x.details.split(":").slice(1).join(":").trim();if(x.details?.startsWith("HTTP "))return ru?"Изменение сохранено успешно":"Change saved successfully";return x.details||"—"}

export default function Developer(){const{lang,admin}=useApp();const[users,setUsers]=useState<any[]>([]),[audit,setAudit]=useState<any[]>([]),[u,setU]=useState(""),[pw,setPw]=useState(""),[busy,setBusy]=useState(false),[refreshing,setRefreshing]=useState(false),[refreshed,setRefreshed]=useState(false),[err,setErr]=useState("");
 const load=async(show=false)=>{if(show){setRefreshing(true);setRefreshed(false)}setErr("");try{const[a,b]:any=await Promise.all([api("/api/admin/users"),api("/api/admin/audit?limit=300")]);setUsers(a.items||[]);setAudit(b.items||[]);if(show){setRefreshed(true);setTimeout(()=>setRefreshed(false),1800)}}catch(e:any){setErr(e.message)}finally{if(show)setRefreshing(false)}};
 useEffect(()=>{if(admin.isDeveloper)load()},[admin.isDeveloper]);
 const add=async()=>{setBusy(true);setErr("");try{await api("/api/admin/users",{method:"POST",body:JSON.stringify({username:u,password:pw,role:"ADMIN"})});setU("");setPw("");await load()}catch(e:any){setErr(e.message)}finally{setBusy(false)}};
 const toggle=async(x:any)=>{if(x.role==="DEVELOPER")return;await api(`/api/admin/users/${x.id}`,{method:"PUT",body:JSON.stringify({isActive:!x.isActive})});await load()};
 if(!admin.isDeveloper)return null;
 return <section><div className="title"><div><h1>{lang==="ru"?"Разработчик":"Developer"}</h1><p>{lang==="ru"?"Админ-аккаунты и история действий":"Admin accounts and activity history"}</p></div></div>{err&&<div className="error">{err}</div>}
 <div className="card"><h2>{lang==="ru"?"Админ-аккаунты":"Admin accounts"}</h2><div className="devCreate"><input placeholder={lang==="ru"?"Логин нового Admin":"New Admin username"} value={u} onChange={e=>setU(e.target.value)}/><input type="password" placeholder={lang==="ru"?"Пароль (минимум 10 символов)":"Password (10+ characters)"} value={pw} onChange={e=>setPw(e.target.value)}/><button className="primary" disabled={busy||u.length<2||pw.length<10} onClick={add}>{lang==="ru"?"Создать Admin":"Create Admin"}</button></div><div className="scroll"><table><thead><tr><th>{lang==="ru"?"Логин":"Username"}</th><th>{lang==="ru"?"Роль":"Role"}</th><th>{lang==="ru"?"Статус":"Status"}</th><th>{lang==="ru"?"Последний вход":"Last login"}</th><th/></tr></thead><tbody>{users.map(x=><tr key={x.id}><td><b>{x.username}</b></td><td>{x.role}</td><td>{x.isActive?"Active":"Disabled"}</td><td>{x.lastLoginAtUtc?new Date(x.lastLoginAtUtc).toLocaleString():"—"}</td><td>{x.role!=="DEVELOPER"&&<button onClick={()=>toggle(x)}>{x.isActive?(lang==="ru"?"Отключить":"Disable"):(lang==="ru"?"Включить":"Enable")}</button>}</td></tr>)}</tbody></table></div></div>
 <div className="card"><div className="rowBetween"><div><h2>{lang==="ru"?"Кто заходил и что делал":"Who visited and what they did"}</h2><p className="auditHint">{lang==="ru"?"Показываем посещения, входы и изменения простым языком":"Visits, logins and changes in plain language"}</p></div><div className="refreshWrap"><span className={refreshed?"refreshOk show":"refreshOk"}>{lang==="ru"?"Обновлено":"Updated"}</span><button className="refreshBtn" disabled={refreshing} onClick={()=>load(true)}>{refreshing?(lang==="ru"?"Обновляем…":"Refreshing…"):(lang==="ru"?"Обновить":"Refresh")}</button></div></div><div className="scroll auditTable"><table><thead><tr><th>{lang==="ru"?"Время":"Time"}</th><th>{lang==="ru"?"Кто":"Who"}</th><th>{lang==="ru"?"Что сделал":"What they did"}</th><th>{lang==="ru"?"Результат / детали":"Result / details"}</th></tr></thead><tbody>{audit.map(x=><tr key={x.id}><td>{new Date(x.createdAtUtc).toLocaleString()}</td><td><b>{humanUser(x,lang)}</b>{x.role&&<div className="auditRole">{x.role}</div>}</td><td>{humanEvent(x,lang)}</td><td>{humanDetails(x,lang)}</td></tr>)}</tbody></table></div></div></section>}
