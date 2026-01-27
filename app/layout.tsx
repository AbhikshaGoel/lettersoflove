import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar"; // Import Navbar here

export const metadata: Metadata = {
  title: "Letters of Soul - Digital Garden",
  description: "A space for poetry and stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased bg-[#F8FAFC] dark:bg-[#020617] text-gray-900 dark:text-gray-50 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar sits here to persist across pages */}

          <Navbar />
          <div className="mt-2">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
