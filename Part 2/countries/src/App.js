import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountry = ({ handleCountrySearchChange }) => (
  <p>
    Search for a country: <input
      onChange={handleCountrySearchChange}
    />
  </p>
)

const CountryNames = ({ filteredCountries }) => (
  filteredCountries.map(country => <div key={country.cca2}> {country.name.common}</div>)
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
    </div>
  )
}

const CountryResults = ({ filteredCountries }) => (
  filteredCountries.length === 1
    ? <Country country = {filteredCountries[0]} />
    : filteredCountries.length <= 10
    ? <CountryNames filteredCountries = {filteredCountries} />
    : <p>Too many matches, please narrow your search</p>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const fetchAllCountries = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(fetchAllCountries, [])
  const handleCountrySearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const countriesFound = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
    setFilteredCountries(countriesFound)
  }
  return (
    <div>
      <FindCountry handleCountrySearchChange={handleCountrySearchChange}/>
      <CountryResults filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
