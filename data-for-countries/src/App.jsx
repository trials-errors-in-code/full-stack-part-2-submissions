import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";
import Filter from "./components/Filter";

const App = () => {
  //!---------------------------------------------------------------------------------------
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  //!----------------------------------------------------------------------------------------
  const [countryData, setCountryData] = useState(null);
  //!----------------------------------------------------------------
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log("gettingdata");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => res.data)
      .then((data) => setCountries(data))
      .catch(() => console.log("Network problem"));
  }, []);
  //!-----------------------------------------------------------------

  let onDetailShow = (name) => {
    let countryDetails = countries.find(
      (country) => country.name.common === name,
    );
    console.log(countryDetails);
    setCountryData(countryDetails);
  };
  return countries.length === 0 ? null : (
    <div>
      <div>App</div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />

      <Filter
        searchString={searchString}
        countries={countries}
        onClick={onDetailShow}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />

      <CountryDetails
        data={countryData}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </div>
  );
};

export default App;
