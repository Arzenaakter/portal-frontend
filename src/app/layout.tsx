import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/home/Navbar";

export const metadata: Metadata = {
  title: "LearnHub — Master Modern Tech",
  description:
    "Professional video learning platform for developers and designers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div
          className="min-h-screen"
          style={{ background: "var(--background)" }}
        >
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
