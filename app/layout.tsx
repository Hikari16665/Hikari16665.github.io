import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { Backdrop } from "@/components/backdrop";
import { CursorAura } from "@/components/cursor-aura";
import { CursorBlob } from "@/components/cursor-blob";
import { IntroOverlay } from "@/components/intro-overlay";
import { RouteReset } from "@/components/route-reset";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NYANKOLUNII SELF INTRO",
    template: "MAGICAL VERY MAGICAL WORLD!",
  },
  description:
    "Hikari（Nyankolunii）—— 住在大连的服务端插件开发者。Minecraft 插件、桌面工具与网页。",
  keywords: ["Hikari", "Nyankolunii", "Minecraft 插件", "Slimefun", "大连", "开发者"],
  authors: [{ name: "Nyankolunii", url: "https://github.com/Hikari16665" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "NYANKOLUNII SELF INTRO",
    title: "NYANKOLUNII SELF INTRO",
    description: "MAGICAL VERY MAGICAL WORLD!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${playfair.variable} ${roboto.variable}`}
    >
      <body className="flex h-dvh flex-col justify-center overflow-hidden bg-paper text-ink antialiased">
        {/* 在首帧之前决定：是放开场，还是直接进站 */}
        <Script id="intro-mode" strategy="beforeInteractive">
          {`(function(){try{var d=sessionStorage.getItem("intro-done")==="1";document.documentElement.dataset.mode=d?"normal":"pending";if(d)document.documentElement.dataset.intro="skip";}catch(e){document.documentElement.dataset.mode="normal";}})();`}
        </Script>
        <noscript>
          <style>{`.intro{display:none!important}html[data-mode] .rise{opacity:1}`}</style>
        </noscript>

        <Backdrop />
        <CursorAura />
        <CursorBlob />
        <RouteReset />

        <IntroOverlay />

        <SiteHeader />
        <main className="relative z-[2] h-[72vh] min-h-0 shrink-0">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
