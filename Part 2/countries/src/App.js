import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountry = ({ handleCountrySearchChange }) => (
  <p>
    Search for a country: <input
      onChange={handleCountrySearchChange}
      />
  </p>
)

const CountryResults = ({ filteredCountries, handleCountryClick, weatherReport, fetchWeatherReport, apiKey }) => {
  return (
    filteredCountries.length === 1
      ? <Country 
          country={filteredCountries[0]} 
          weatherReport={weatherReport} 
          apiKey={apiKey}
          fetchWeatherReport={fetchWeatherReport} />
      : filteredCountries.length <= 10
        ? <CountryNames 
            filteredCountries={filteredCountries} 
            handleCountryClick={handleCountryClick} />
        : <p>Too many matches, please narrow your search</p>
  )
}

const CountryNames = ({ filteredCountries, handleCountryClick }) => (
  filteredCountries.map((country, i) =>
    <div key={country.cca2}>
      {country.name.common} <button onClick={handleCountryClick(i)}> Show</button>
    </div>)
)

const Country = ({ country, fetchWeatherReport, weatherReport, apiKey }) => {
  const countryName = country.name.common;
  const capital = country.capital;
  const capitalLatLong = country.capitalInfo.latlng
  const languages = Object.values(country.languages).map(language => <li key={language}>{language}</li>);
  const flagImg = <img src={country.flags.png} height="100px" />;
  useEffect(fetchWeatherReport(apiKey, capitalLatLong), [country]);
  return (
    <div>
      <h2>{countryName}</h2>
      <p>
        Capital: {capital} <br />
        Population: {country.population}
      </p>
      <h4>
        Languages
      </h4>
      <ul>
        {languages}
      </ul>
      {flagImg}
      <h4>
        Weather in {countryName}
      </h4>
      <Weather weatherReport={weatherReport} />
    </div>
  )
}

const Weather = ({ weatherReport }) => {
  const temp = weatherReport.current.temperature;
  const windSpeed = weatherReport.current.wind_speed;
  const windDir = weatherReport.current.wind_dir;
  const tempUnit = weatherReport.request.unit === 'm' 
    ? 'Celcius'
    : 'f'
      ? 'Fahrenheit'
      : ''
  return (
    <>
      Temperature: {temp} {tempUnit}  <br />
      <img src={weatherReport.current.weather_icons[0]} /> <br />
      Wind Speed: {windSpeed} {windDir} 
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY;
  const [weatherReport, setWeatherReport] = useState(
    {"request":{"type":"City","query":"New York, United States of America","language":"en","unit":"m"},"location":{"name":"New York","country":"United States of America","region":"New York","lat":"40.714","lon":"-74.006","timezone_id":"America\/New_York","localtime":"2021-10-28 00:12","localtime_epoch":1635379920,"utc_offset":"-4.0"},"current":{"observation_time":"04:12 AM","temperature":13,"weather_code":122,"weather_icons":["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0004_black_low_cloud.png"],"weather_descriptions":["Overcast"],"wind_speed":0,"wind_degree":5,"wind_dir":"N","pressure":1012,"precip":0,"humidity":60,"cloudcover":100,"feelslike":12,"uv_index":1,"visibility":16,"is_day":"no"}}
  )
  const fetchAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(fetchAllCountries, []);
  const fetchWeatherReport = (apiKey, uriEncodedCapital) => () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${uriEncodedCapital}`)
      .then(response => {
        setWeatherReport(response.data);
      })
  };
  const handleCountrySearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const countriesFound = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
    setFilteredCountries(countriesFound)
  }
  const handleCountryClick = (countryIndex) => () => {
    const clickedCountry = [filteredCountries[countryIndex]]
    setFilteredCountries(clickedCountry)
  }
  return (
    <div>
      <FindCountry 
        handleCountrySearchChange={handleCountrySearchChange} 
      />
      <CountryResults 
        filteredCountries={filteredCountries} 
        handleCountryClick={handleCountryClick} 
        apiKey={apiKey}
        fetchWeatherReport={fetchWeatherReport}
        weatherReport={weatherReport}  
      />
    </div>
  );
};

export default App;
