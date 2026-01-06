import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Data Analysis Agent",
  description: "Upload CSV files and ask questions about your data using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
