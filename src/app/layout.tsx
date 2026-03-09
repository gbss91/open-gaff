import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "OpenGaff",
  description: "Rent transparency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${bricolage.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
