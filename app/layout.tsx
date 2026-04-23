import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Architects Association Maldives",
  description: "Official platform for the Architects Association Maldives (AAM).",
};

import { AdminProvider } from "@/lib/admin-context";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <AdminProvider>
          <AdminLayoutWrapper>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AdminLayoutWrapper>
        </AdminProvider>
      </body>
    </html>
  );
}
