import Link from "next/link";

const items = [
  ["/", "Dashboard"],
  ["/calendar", "Calendar"],
  ["/rankings", "Rankings"],
  ["/brokers", "Brokers"],
  ["/settings", "Settings"]
];

export default function Nav() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">D</div>
        <div><strong>DDA Pulse</strong><span>Instagram KPI</span></div>
      </div>
      <nav>
        {items.map(([href, label]) => (
          <Link key={href} href={href} className="navItem">{label}</Link>
        ))}
      </nav>
      <div className="sideFoot"><span className="dot online" />Monitoring system</div>
    </aside>
  );
}
