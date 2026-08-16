import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DORSEN Bridge — Secure Cross-Chain Asset Transfer",
  description:
    "Transfer digital assets securely across supported blockchain networks with DORSEN Bridge.",
  openGraph: {
    title: "DORSEN Bridge — Secure Cross-Chain Asset Transfer",
    description:
      "Transfer digital assets securely across supported blockchain networks with DORSEN Bridge.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <WalletProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
