import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "./components/ThemeSwitcher";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taj Ranthambhore Resort",
  description:
    "A luxury resort where royalty meets the wild. Nestled near the Ranthambhore Tiger Reserve in Rajasthan, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen">
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
