import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const PoppinsFont= Poppins({
  variable:'--font-poppins',
  subsets: ["latin"],
  weight:'400'

})

export const metadata = {
  title: "Kono Banking Application",
  description: "A Bank for childrens and Program ",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`  ${PoppinsFont.variable}   `}
        suppressHydrationWarning
      >
        <MainLayout>

        {children}
        </MainLayout>
      </body>
    </html>
  );
}
