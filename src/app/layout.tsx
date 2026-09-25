import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { headers } from "next/headers";
import ContextProvider from "@/context";

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
  // icons: {
  //   icon: "/images/dorsen.svg",
  // },
  openGraph: {
    title: "DORSEN Bridge — Secure Cross-Chain Asset Transfer",
    description:
      "Transfer digital assets securely across supported blockchain networks with DORSEN Bridge.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ContextProvider cookies={cookies}>
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
