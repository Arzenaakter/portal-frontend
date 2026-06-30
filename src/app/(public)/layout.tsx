import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

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
      <body>
        <div
          className="min-h-screen pt-16"
          style={{ background: "var(--background)" }}
        >
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
