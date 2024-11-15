// src/components/Weather.js
import React, { useState } from "react";
import axios from "axios";
import { WiThermometer, WiHumidity, WiStrongWind, WiCloud, WiDaySunny, WiRain, WiSnow, WiFog } from "react-icons/wi";
import ReactLoading from 'react-loading';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://weather-api-ly7c.onrender.com/api/weather", {
        params: { city },
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar dados meteorológicos.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return <WiDaySunny size={48} />;
    if (description.includes("cloud")) return <WiCloud size={48} />;
    if (description.includes("rain")) return <WiRain size={48} />;
    if (description.includes("snow")) return <WiSnow size={48} />;
    if (description.includes("fog") || description.includes("mist")) return <WiFog size={48} />;
    return <WiCloud size={48} />;
  };

  return (
    <div className="weather-container max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Buscando...' : 'Buscar Clima'}
        </button>
      </form>

      {/* Exibe o loader enquanto os dados estão sendo carregados */}
      {loading && (
        <div className="flex justify-center items-center">
          <ReactLoading type="spin" color="#3498db" height={50} width={50} />
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {weatherData && (
        <div className="weather-card p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">{weatherData.name}</h2>
          <div className="weather-info text-center mt-4">
            {getWeatherIcon(weatherData.weather[0].description)}
            <p className="text-xl text-gray-600 mt-2">
              {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
            </p>
          </div>
          <p className="text-lg text-gray-700 mt-4">
            <WiThermometer size={24} className="inline-block" /> Temperatura: {weatherData.main.temp}°C
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <WiThermometer size={24} className="inline-block" /> Temperatura Max: {weatherData.main.temp_max}°C
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <WiThermometer size={24} className="inline-block" /> Temperatura Min: {weatherData.main.temp_min}°C
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <WiHumidity size={24} className="inline-block" /> Umidade: {weatherData.main.humidity}%
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <WiStrongWind size={24} className="inline-block" /> Vento: {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
