import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThreeBackground } from "@/components/three/ThreeBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slan Chong | Full Stack Developer",
  description:
    "Portfolio of Slan Chong (Kitsunezu) — Full Stack Developer specializing in TypeScript, React, and cloud-native infrastructure.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pb-16 md:pb-0">
        <Providers locale={locale} messages={messages as Record<string, unknown>}>
          <ThreeBackground />
          <Navbar />
          <PageTransition>
            <main className="flex-1">
              {children}
            </main>
          </PageTransition>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
