export default function StatusPill({ value }: { value?: string | null }) {
  const v = (value || "UNKNOWN").toUpperCase();
  const cls =
    v.includes("GREEN") || v.includes("SUCCESS") || v.includes("ACTIVE") ? "green" :
    v.includes("YELLOW") || v.includes("REVIEW") ? "yellow" :
    v.includes("RED") || v.includes("FAILED") || v.includes("ERROR") ? "red" :
    "neutral";
  return <span className={`pill ${cls}`}>{v.replaceAll("_", " ")}</span>;
}
