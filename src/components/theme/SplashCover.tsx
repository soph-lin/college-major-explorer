import { useState } from 'react'
import Image from 'next/image'

const images = ['/bunny.jpg', '/cat.jpg', '/girl.jpg']

export default function SplashCover() {
  const [index, setIndex] = useState(Math.floor(Math.random() * images.length))
  const [key, setKey] = useState(0)

  const handleNextImage = () => {
    setKey((prev) => prev + 1)
    setIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <Image
      key={key}
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 animate-pop"
      src={images[index]}
      alt="splash-cover"
      width={300}
      height={0}
      style={{ height: 'auto' }}
      onClick={handleNextImage}
    />
  )
}
