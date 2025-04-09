import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const API_KEY = '2a7caa002c76f598c937b8c95aff7fc1';
    const fetchWeather = async (e) => {
        e.preventDefault();
        if (!city.trim())
            return;
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            setWeather(response.data);
            setError('');
        }
        catch (err) {
            setWeather(null);
            setError('City not found. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-md", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6 text-center", children: "Weather App" }), _jsx("form", { onSubmit: fetchWeather, className: "mb-6", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: city, onChange: (e) => setCity(e.target.value), placeholder: "Enter city name", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: loading }), _jsx("button", { type: "submit", className: `px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`, disabled: loading, children: loading ? 'Searching...' : 'Search' })] }) }), error && (_jsx("div", { className: "text-red-500 text-center mb-4", children: error })), loading && (_jsx("div", { className: "text-center text-gray-600", children: "Loading weather data..." })), weather && !loading && (_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: weather.name }), _jsx("div", { className: "flex justify-center mb-4", children: _jsx("img", { src: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`, alt: "Weather icon", className: "w-20 h-20" }) }), _jsxs("div", { className: "text-5xl font-bold text-gray-800 mb-4", children: [Math.round(weather.main.temp), "\u00B0C"] }), _jsx("div", { className: "text-gray-600 capitalize mb-4", children: weather.weather[0].description }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-gray-100 p-3 rounded-lg", children: [_jsx("div", { className: "text-gray-500", children: "Feels Like" }), _jsxs("div", { className: "text-xl font-semibold", children: [Math.round(weather.main.feels_like), "\u00B0C"] })] }), _jsxs("div", { className: "bg-gray-100 p-3 rounded-lg", children: [_jsx("div", { className: "text-gray-500", children: "Humidity" }), _jsxs("div", { className: "text-xl font-semibold", children: [weather.main.humidity, "%"] })] })] })] }))] }) }) }));
}
export default App;
