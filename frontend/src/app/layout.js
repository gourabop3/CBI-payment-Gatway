import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/MainLayout";
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="w-full flex justify-center gap-6 py-6 border-t border-gray-200 bg-white mt-10">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-2xl"><FaInstagram /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 text-2xl"><FaLinkedin /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black text-2xl"><FaGithub /></a>
        </footer>
      </body>
    </html>
  );
}
