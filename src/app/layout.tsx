import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/context/contextProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Survay",
  description: "Survay application",
  icons: {
    icon: "https://cdn3.notifyvisitors.com/blog/wp-content/uploads/2020/08/28101109/What-Are-Online-Surveys.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>

        <Toaster />

        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
