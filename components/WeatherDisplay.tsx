import Image from 'next/image'
import { WeatherData } from '@/types/types'

export default function WeatherDisplay({ weather }: { weather: WeatherData }) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{weather.name}</h2>
        <Image
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          width={50}
          height={50}
        />
      </div>
      <p className="text-5xl font-bold mb-4">{Math.round(weather.main.temp)}°C</p>
      <p className="text-gray-600 capitalize mb-2">{weather.weather[0].description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-500">Wind Speed</p>
          <p className="font-semibold">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

