import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kmeans-clustering.vercel.app/'),
  title: "K-means Clustering WebApp - 東京都市大学 人工知能とデータマイニング",
  description: "東京都市大学 情報システム学科の『人工知能とデータマイニング』任意課題3で作成したプログラムです。K-means法(k=3)を使用して横浜キャンパス2号館の大陽光パネルの発電量に関するCSVデータをクラスタリングし、クラスタごとのデータの傾向を解析します。",
  keywords: ["K-means", "クラスタリング", "人工知能", "データマイニング", "東京都市大学", "情報システム学科", "CSV", "正規化データ", "太陽光発電", "課題3"],
  authors: [{ name: "山下マナト", url: "https://manapuraza.com" }],
  openGraph: {
    title: "K-means Clustering WebApp - 東京都市大学 人工知能とデータマイニング",
    description: "東京都市大学 情報システム学科の『人工知能とデータマイニング』任意課題3で作成したプログラムです。K-means法(k=3)を使用して横浜キャンパス2号館の大陽光パネルの発電量に関するCSVデータをクラスタリングし、クラスタごとのデータの傾向を解析します。",    url: "https://kmeans-clustering.vercel.app",
    siteName: "東京都市大学 山下マナト - K-means Clustering",
    images: [
      {
        url: "/ogp.jpeg",
        width: 1200,
        height: 630,
        alt: "人工知能とデータマイニング: K-meansクラスタリング",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@manapuraza",
    creator: "@manapuraza",
    title: "K-means Clustering WebApp - 東京都市大学 人工知能とデータマイニング",
    description: "東京都市大学 情報システム学科の『人工知能とデータマイニング』任意課題3で作成したプログラムです。K-means法(k=3)を使用して横浜キャンパス2号館の大陽光パネルの発電量に関するCSVデータをクラスタリングし、クラスタごとのデータの傾向を解析します。",
    images: ["./ogp.jpeg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
