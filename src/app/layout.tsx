import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import ThemePicker from '@/components/theme/ThemePicker'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NYC College Major Explorer',
  description:
    'Explore academic majors offered by NYC colleges with filtering and search capabilities',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeRegistry>
          <ThemePicker />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
