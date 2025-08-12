import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsRouter from "@/components/AnalyticsRouter";
import { QuizProvider } from "@/context/QuizContext";
import { getHomeMeta, getLocaleFromContext, generateHreflangAlternates, getAbsoluteUrl } from "@/lib/seo";
import { GA_ID, isProd } from "@/lib/ga";
import { loadUIMessages } from "@/lib/i18n";
import { readFileSync } from 'fs';
import { join } from 'path';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromContext();
  const { title, description } = getHomeMeta(locale);
  
  return {
    title,
    description,
    alternates: generateHreflangAlternates(),
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(),
      siteName: title.split(' — ')[0], // Extract site name from title
      images: [
        {
          url: getAbsoluteUrl('/og'),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getAbsoluteUrl('/og')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Helper to load UI data for layout
function getUIData(locale: string) {
  try {
    const filePath = join(process.cwd(), 'public', 'locales', locale, 'ui.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to load UI data for locale ${locale}:`, error);
    // Return minimal fallback without switching locale
    return {
      siteTitle: locale === 'ko' ? '퍼스널 컬러 테스트' : 'Personal Color Test'
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocaleFromContext();
  const uiData = getUIData(locale);
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased flex flex-col`}>
        {/* GA4 Scripts - only load in production with GA_ID */}
        {isProd && GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        
        <QuizProvider>
          <AnalyticsRouter />
          <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link 
                  href="/" 
                  className="text-gray-900 font-semibold tracking-tight"
                  aria-label="홈페이지로 이동"
                >
                  {uiData.siteTitle}
                </Link>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
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
                <p>&copy; 2025 {uiData.siteTitle}. All rights reserved.</p>
              </div>
            </div>
          </footer>
          
          {/* Consent Banner */}
          <ConsentBanner ui={uiData} />
        </QuizProvider>
      </body>
    </html>
  );
}
