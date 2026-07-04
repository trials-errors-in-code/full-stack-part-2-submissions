import React from "react";
import CountryDetails from "./CountryDetails";

const Filter = ({ searchString, countries, onClick, weatherData, setWeatherData }) => {
  if (!searchString) {
    return null;
  }
  const lowercaseSearchStr = searchString.toLowerCase();

  const result = countries.filter((country) =>
    country.name.common.toLowerCase().includes(lowercaseSearchStr),
  );
  if (result.length === 1) {
    return (
      <CountryDetails
        data={result[0]}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    );
  }
  return (
    <div>
      {result.length > 10
        ? "too many countries"
        : result.map((country) => (
            <li key={country.tld + country.area}>
              {country.name.common}{" "}
              <button onClick={() => onClick(country.name.common)}>
                show details
              </button>
            </li>
          ))}
    </div>
  );
};

export default Filter;
