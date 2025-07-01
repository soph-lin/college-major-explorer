'use client'

import { useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import { themes } from '@/lib/constants/themes'

const themeNames = Object.keys(themes)

export default function ThemePicker() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentTheme')
      return saved ? themeNames.findIndex((t) => t === saved) : 0
    }
    return 0
  })
  const [isHovered, setIsHovered] = useState(false)
  const [key, setKey] = useState(0)

  const handleThemeChange = () => {
    setKey((prev) => prev + 1)
    const newIndex = (currentTheme + 1) % themeNames.length
    setCurrentTheme(newIndex)
    localStorage.setItem('currentTheme', themeNames[newIndex])
    // Trigger storage event for ThemeRegistry
    window.dispatchEvent(new Event('storage'))
  }

  const selectedThemeName = themeNames[currentTheme]

  return (
    <div className="fixed top-4 right-4 z-50">
      <Tooltip content={selectedThemeName} isVisible={isHovered}>
        <div
          key={key}
          className="w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 animate-pop shadow-md bg-background"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleThemeChange}
        />
      </Tooltip>
    </div>
  )
}
