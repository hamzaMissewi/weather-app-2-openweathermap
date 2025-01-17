'use client'
import { useState, useEffect } from 'react'
import WeatherDisplay from '@/components/WeatherDisplay'
import LoadingSpinner from '@/components/LoadingSpinner'
import { WeatherData } from '@/types/types'

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          fetchWeather(latitude, longitude)
        },
        () => {
          setError('Unable to retrieve your location')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
    }
  }, [])

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      const data = await response.json()
      setWeather(data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching weather data')
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>
      {weather && <WeatherDisplay weather={weather} />}
    </main>
  )
}

