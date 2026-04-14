import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'ListBridge — Bağlantılı, Akıllı Liste Yönetimi',
    template: '%s | ListBridge',
  },
  description:
    'Listelerini sadece tutma — organize et, bağla ve paylaş. ListBridge ile tüm listelerini tek bir akıllı çalışma alanında yönet.',
  keywords: ['liste yönetimi', 'üretkenlik', 'todo', 'list app', 'organize'],
  openGraph: {
    title: 'ListBridge',
    description: 'Bağlantılı, akıllı ve paylaşılabilir liste yönetimi.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </TooltipProvider>
      </body>
    </html>
  )
}
