'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'
import { themes } from '@/lib/constants/themes'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Apply theme by setting CSS variables
    const applyTheme = () => {
      const name = localStorage.getItem('currentTheme') || 'notebook'
      const currentTheme = themes[name as keyof typeof themes]

      // Set CSS variables
      document.documentElement.style.setProperty(
        '--foreground',
        currentTheme.text,
      )
      document.documentElement.style.setProperty(
        '--background',
        currentTheme.bg,
      )
    }

    applyTheme()

    // Listen for theme changes
    const handleStorageChange = () => applyTheme()
    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
