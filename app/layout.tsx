import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";

import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiMart | SELL FASTER, BUY SMARTER",
  description: "Final Year Project for Collins & David",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          {children}

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
