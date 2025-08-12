import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "개인 색상 테스트",
  description: "당신만의 퍼스널 컬러를 찾아보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                개인 색상 테스트
              </h1>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  한국어
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  English
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
        
        <footer className="bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2025 개인 색상 테스트. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
