// https://geocoding-api.open-meteo.com/v1/search?name=Crotone PER LATITUDINE E LONGITUDINE
// https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation,weathercode&timezone=auto URL API

import { useEffect, useState } from "react";

export default function Homepage() {
  const cities = ["Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova"];
  const [weatherData, setWeatherData] = useState([]);

  const weatherCodes = {
    0: "Sereno",
    1: "Poco nuvoloso",
    2: "Variabile",
    3: "Coperto",
    45: "Nebbia",
    48: "Nebbia con brina",
    51: "Pioviggine debole",
    52: "Pioviggine debole",
    53: "Pioviggine moderata",
    54: "Pioviggine moderata",
    55: "Pioviggine intensa",
    56: "Pioviggine congelante",
    57: "Pioviggine congelante",
    61: "Pioggia debole",
    62: "Pioggia debole",
    63: "Pioggia moderata",
    65: "Pioggia intensa",
    66: "Pioggia congelante",
    67: "Pioggia congelante",
    71: "Neve debole",
    72: "Neve debole",
    73: "Neve moderata",
    75: "Neve intensa",
    76: "Neve intensa",
    77: "Granuli di ghiaccio",
    80: "Rovesci di pioggia",
    81: "Rovesci di pioggia",
    82: "Rovesci di pioggia intensi",
    85: "Rovesci di neve",
    86: "Rovesci di neve",
    95: "Temporale",
    96: "Temporale con grandine",
    99: "Temporale con grandine",
  };

  function getWeather(code) {
    return weatherCodes[code] || "Codice meteo non riconosciuto";
  }

  useEffect(() => {
    const fetchWeather = async () => {
      const results = await Promise.all(
        cities.map(async (city) => {
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
          );
          const geoData = await geoRes.json();
          if (!geoData.results || geoData.results.length === 0) {
            return { city, error: "Coordinate non trovate" };
          }

          const lat = geoData.results[0].latitude;
          const lon = geoData.results[0].longitude;

          const meteoRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&timezone=auto`
          );

          if (!meteoRes.ok) {
            return { city, error: `Errore HTTP ${meteoRes.status}` };
          }

          const meteoData = await meteoRes.json();
          return {
            city,
            temperature: meteoData.hourly.temperature_2m[0],
            weather: getWeather(meteoData.hourly.weathercode[0]),
          };
        })
      );
      setWeatherData(results);
    };
    fetchWeather();
  }, []);
  return (
    <>
      <h1>Meteo</h1>
      <ul>
        {weatherData.map((m) => {
          return (
            <li key={m.city}>
              {" "}
              {m.city}, {m.temperature}°C, {m.weather}
            </li>
          );
        })}
      </ul>
    </>
  );
}
