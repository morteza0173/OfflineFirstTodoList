import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ActiveIndexProvider } from "@/context/ActiveIndexContext";
import Providers from "./Providers";

const yekanBakh = localFont({
  src: "../fonts/YekanBakh-Regular.woff2",
  variable: "--font-yekan-bakh",
  weight: "400",
});
export const metadata: Metadata = {
  title: "toDoList",
  description: "A simple to-do list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <ActiveIndexProvider>
        <body className={`${yekanBakh.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </ActiveIndexProvider>
    </html>
  );
}
