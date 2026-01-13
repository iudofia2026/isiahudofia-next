import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Isiah Udofia | AI-Native Designer & Developer",
  description: "Portfolio showcasing AI-driven design and development work by Isiah Udofia, Yale Senior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
