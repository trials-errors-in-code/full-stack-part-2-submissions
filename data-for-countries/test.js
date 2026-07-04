import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [countryData, setCountryData] = useState(null);

  let urlAll = "https://studies.cs.helsinki.fi/restcountries/api/all";
  let count = 0;
  useEffect(() => {
    console.log(count + 1);
    console.log("gettingdata");
    axios
      .get(urlAll)
      .then((res) => res.data)
      .then((data) => setCountries(data))
      .catch((error) => console.log("Network problem"));
  }, []);
  if (countries === null) {
    return null;
  }

  let showDetails = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => setCountryData(res.data))
      .catch((error) => {
        console.log(`error in fetching ${name} country's data`);
      });
  };

  let searchResult =
    searchString === ""
      ? null
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchString.toLowerCase()),
        );

  if (Object.entries(searchResult).length === 1) {
    showDetails(searchResult[0]);
  }

  return (
    <div>
      <div>App</div>
      <div className="main"></div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <div>
        {searchResult === null
          ? ""
          : searchResult.length > 10
            ? "too many countries"
            : searchResult.map((country) => (
                <li key={country.tld[0] + country.cca2 + country.cca3}>
                  {country.name.common}{" "}
                  <button
                    onClick={() =>
                      showDetails(country.name.common.toLowerCase())
                    }
                  >
                    show details
                  </button>
                </li>
              ))}
      </div>
      <CountryDetails data={countryData} />
    </div>
  );
};

export default App;
