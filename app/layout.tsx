import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'NEXUS — 기업에겐 인재를, 청소년에겐 더 나은 미래를',
    template: '%s | NEXUS',
  },
  description:
    '성적표가 아닌 실력으로 증명하는 청소년 실전 역량 인증 플랫폼. 기업의 실제 미션을 수행하고, AI가 분석한 역량 인증서를 받으세요.',
  keywords: ['청소년', '인재교육', '실무프로젝트', '에듀테크', '취업연계', 'NEXUS', 'PACM', 'SkillBridge'],
  metadataBase: new URL('https://nexus.pacm.kr'),
  openGraph: {
    title: 'NEXUS — 청소년 실전 역량 인증 플랫폼',
    description: '기업에겐 인재를, 청소년에겐 더 나은 미래를',
    url: 'https://nexus.pacm.kr',
    siteName: 'NEXUS by PACM',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NEXUS by PACM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS — 청소년 실전 역량 인증 플랫폼',
    description: '기업에겐 인재를, 청소년에겐 더 나은 미래를',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg',      type: 'image/svg+xml' },
      { url: '/favicon.ico',      sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png',     sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png',     sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#112240',
              border: '1px solid rgba(184,255,71,0.2)',
              color: '#F5F5F0',
            },
          }}
        />
      </body>
    </html>
  )
}
