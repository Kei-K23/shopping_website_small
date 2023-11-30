import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Session from "@/provider/session-provider";
import Navbar from "./_component/Navbar";
import { ShoppingCartProvider } from "@/provider/ShoppingCartProvider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopWithMe",
  description: " Discover Endless Shopping Delights with ShopWithMe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Session>
            <ShoppingCartProvider>
              <Navbar />
              {children}
              <Toaster />
            </ShoppingCartProvider>
          </Session>
        </QueryProvider>
      </body>
    </html>
  );
}
