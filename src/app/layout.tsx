import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const SITE_URL = "https://policyhub.kr";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "정책허브 - 정부 지원 정책 모음", template: "%s | 정책허브" },
  description:
    "정부 지원 정책과 혜택을 한 곳에서 쉽게 확인하세요. 복지·청년·창업·주거·교육·일자리 정책을 매일 자동 업데이트합니다.",
  keywords: ["정부지원", "정책", "혜택", "복지", "청년지원", "창업지원", "주거지원", "보조금"],
  authors: [{ name: "정책허브" }],
  creator: "정책허브",
  openGraph: {
    siteName: "정책허브",
    locale: "ko_KR",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="4oUpq5twpZqrNtxW9V6OBU900SGDIzsBdE87ZXy4xU4" />
        {/* AdSense 승인 후 NEXT_PUBLIC_ADSENSE_CLIENT 환경변수 설정 */}
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
