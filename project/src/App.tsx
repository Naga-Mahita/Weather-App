import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '2a7caa002c76f598c937b8c95aff7fc1';

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Weather App</h1>
        
        <form onSubmit={fetchWeather} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {loading && (
          <div className="text-center text-gray-600">Loading weather data...</div>
        )}

        {weather && !loading && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{weather.name}</h2>
            <div className="flex justify-center mb-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="w-20 h-20"
              />
            </div>
            <div className="text-5xl font-bold text-gray-800 mb-4">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-gray-600 capitalize mb-4">
              {weather.weather[0].description}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-gray-500">Feels Like</div>
                <div className="text-xl font-semibold">{Math.round(weather.main.feels_like)}°C</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="text-gray-500">Humidity</div>
                <div className="text-xl font-semibold">{weather.main.humidity}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default App;