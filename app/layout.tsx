import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tracklog",
  description: "Sistema de Rastreamento de Entregas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`h-full ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
