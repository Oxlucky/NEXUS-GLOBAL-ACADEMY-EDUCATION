import "./globals.css";

export const metadata = {
  title: "NEXUS GLOBAL ACADEMY",
  description: "NEXUS candlestick trading education.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
