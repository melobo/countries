import React from 'react'
import Country from './Country'

const Countries = ({countries, searchCountry, displayCountryInfo}) => {
  if (searchCountry === '') return null

  if (countries.length > 10) return (
    <div>
      Too many matches, specify another filter.
    </div>
  )

  if (countries.length === 1) return (
    <Country country={countries[0]}/>
  )

  const handleShowCountry = country => displayCountryInfo(country)

  return (
    <>
      {
        countries.map(country => <div key={`${country.ccn3}-${country.name.common}`}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country.name.common)}>
            show
          </button>
        </div>)
      }
    </>
  );
}

export default Countries
