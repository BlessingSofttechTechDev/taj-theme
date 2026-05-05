import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHPL — Concept 02 (Internal)",
  robots: { index: false, follow: false },
};

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
