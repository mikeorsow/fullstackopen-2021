import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FindCountry = () => {
  return (
    <p>
        Search for a country: <input>
        </input> 
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
console.log('render', countries.length, countries)
  return (
    <div>
      <FindCountry />
    </div>
  );
}

export default App;
