import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchChange = event => setSearchCountry(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = !searchCountry
    ? countries  
    : countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const displayCountryInfo = countryName => setSearchCountry(countryName)

  return (
    <div>
      <Filter
        searchCountry={searchCountry}
        handleSearchChange={handleSearchChange}
      />
      <Countries
        countries={filteredCountries}
        searchCountry={searchCountry}
        displayCountryInfo={displayCountryInfo}
      />
    </div>
  );
}

export default App;
