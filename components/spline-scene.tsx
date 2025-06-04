"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Spline from "@splinetool/react-spline"

export default function SplineScene() {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <SplineLoadingFallback />
  }

  if (hasError) {
    return <SplineErrorFallback />
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && <SplineLoadingFallback />}
      <Spline
        scene="https://prod.spline.design/AEU6MoqZ2flE-h6x/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          pointerEvents: "none",
        }}
        onLoad={() => {
          console.log("Spline scene loaded successfully")
          setIsLoading(false)
        }}
        onError={(error) => {
          console.warn("Spline failed to load:", error)
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

function SplineLoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

function SplineErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg">
      <div className="text-center p-6">
        <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">3D Health Visualization</p>
      </div>
    </div>
  )
}
