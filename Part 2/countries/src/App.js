import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountry = ({ countrySearch, handleCountrySearchChange }) => {
  return (
    <p>
        Search for a country: <input
          value={countrySearch}
          onChange={handleCountrySearchChange} 
        />
    </p>
  )
}
function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])
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
console.log('render', countries.length, countries);
const handleCountrySearchChange = (event) => setCountrySearch(event.target.value);
const countryToShow = 
  countries.filter(country => country.name.common
    .toLowerCase()
    .includes(
      countrySearch
      .toLocaleLowerCase()
    )
  )
console.log('countryToShow', countryToShow.map(country => country.name.common))
  return (
    <div>
      <div>
        <FindCountry 
          countrySearch={countrySearch} 
          handleCountrySearchChange={handleCountrySearchChange}
        />
      </div>
        {countryToShow.map(country => <div key={country.cca2}> {country.name.common}</div>)}
      <div>
      </div>
    </div>
  );
}

export default App;
