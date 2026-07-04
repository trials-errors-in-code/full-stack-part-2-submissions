import React, { useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountryDetails = ({ data, weatherData, setWeatherData }) => {
  useEffect(() => {
    if (!data) {
      setWeatherData(null);
      return;
    }

    let lat = data.latlng[0];
    let lng = data.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_KEY}`,
      )
      .then((res) => {
        setWeatherData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{data.name.common}</h1>
      <h4 className="capital">Capital : {data.capital[0]}</h4>
      <h4 className="area">Area: {data.area}</h4>

      <h2 className="languages">Languages</h2>
      {Object.entries(data.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}
      <img className="flag" src={data.flags.png} alt={data.flags.alt} />
      <Weather weatherData={weatherData} />
    </div>
  );
};

export default CountryDetails;
