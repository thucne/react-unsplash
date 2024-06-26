import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React/Next.js Unsplash",
  description: "A simple application to demonstrate the usage of Unsplash API with Next.js, TailwindCSS and Material-UI.",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/katyperrycbt/image/upload/v1719285606/xvjqkpva5bsphjzuqkv5.jpg",
        alt: "A Next.js application with Unsplash API",
        width: 2400,
        height: 1260,
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
