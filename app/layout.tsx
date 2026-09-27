import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "DDA Pulse",
  description: "DDA Real Estate Instagram KPI monitoring"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><div className="appShell"><Nav /><main className="main">{children}</main></div></body>
    </html>
  );
}
