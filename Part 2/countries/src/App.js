import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountry = ({ handleCountrySearchChange }) => (
  <p>
    Search for a country: <input
      onChange={handleCountrySearchChange}
    />
  </p>
)

const CountryNames = ({ filteredCountries, handleCountryClick }) => (
  filteredCountries.map((country, i) =>
    <div key={country.cca2}>
      {country.name.common} <button onClick={handleCountryClick(i)}> Show</button>
    </div>)
)

const Country = ({ country }) => {
  const languages = Object.values(country.languages).map(language => <li key={language}>{language}</li>);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital} <br />
        Population: {country.population}
      </p>
      <h4>Languages</h4>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} height="100px" />
    </div>
  )
}

const CountryResults = ({ filteredCountries, handleCountryClick }) => {
  return (
    filteredCountries.length === 1
      ? <Country country={filteredCountries[0]} />
      : filteredCountries.length <= 10
        ? <CountryNames filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} />
        : <p>Too many matches, please narrow your search</p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const fetchAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(fetchAllCountries, [])
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
      <FindCountry handleCountrySearchChange={handleCountrySearchChange} />
      <CountryResults filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} />
    </div>
  );
};

export default App;
