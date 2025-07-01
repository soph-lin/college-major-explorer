import { useState } from 'react'
import Image from 'next/image'
import { Skeleton, Box } from '@mui/material'

const images = ['/bunny.jpg', '/cat.jpg', '/girl.jpg']

export default function SplashCover() {
  const [index, setIndex] = useState(Math.floor(Math.random() * images.length))
  const [key, setKey] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  const handleNextImage = () => {
    setKey((prev) => prev + 1)
    setIndex((prevIndex) => (prevIndex + 1) % images.length)
    setImageLoading(true) // Reset loading state when changing image
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <Box sx={{ position: 'relative', width: 300 }}>
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          width={300}
          height={300}
          sx={{
            borderRadius: '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
      )}
      <Image
        key={key}
        className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 animate-pop"
        src={images[index]}
        alt="splash-cover"
        width={300}
        height={0}
        style={{
          height: 'auto',
          opacity: imageLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onClick={handleNextImage}
        onLoad={handleImageLoad}
      />
    </Box>
  )
}
