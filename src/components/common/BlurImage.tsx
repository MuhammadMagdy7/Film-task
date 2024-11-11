// components/BlurImage.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BlurImageProps {
  src: string
  alt: string
  className?: string
}

export default function BlurImage({ src, alt, className }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          object-cover
          duration-700 ease-in-out
          ${isLoading 
            ? 'scale-110 blur-lg grayscale'
            : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}