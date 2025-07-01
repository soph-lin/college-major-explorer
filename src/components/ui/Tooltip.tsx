import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  isVisible: boolean
}

export default function Tooltip({
  children,
  content,
  isVisible,
}: TooltipProps) {
  return (
    <div className="relative inline-block">
      {children}
      {isVisible && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 pointer-events-none">
          <div className="bg-gray-800 !text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
            {content}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  )
}
