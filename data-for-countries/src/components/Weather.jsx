import React from "react";

const Weather = ({ weatherData }) => {
  let weatherHeader = {
    width: 300,
    display: "flex",
    justifyContent: "space-between",
  };

  if (!weatherData) {
    return null;
  }
  return (
    <div className="weather">
      <div style={weatherHeader}>
        <div>{weatherData.name} </div>
        <div>{weatherData.weather[0].description}</div>
      </div>
      <div
        style={{
          width: 150,
          height: 100,
          justifyItems: "center",
          margin: "10px 50px",
          padding: 20,
        }}
      >
        <img
          style={{ scale: 3 }}
          src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
      <div>Temperature : {(weatherData.main.temp - 273).toFixed(1)}&deg;C</div>
    </div>
  );
};

export default Weather;
