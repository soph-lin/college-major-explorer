import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import ThemePicker from '@/components/theme/ThemePicker'
import './globals.css'

const firaCode = Fira_Code({
  variable: '--font-fira-code',
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
      <body className={`${firaCode.variable} antialiased`}>
        <ThemeRegistry>
          <ThemePicker />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
