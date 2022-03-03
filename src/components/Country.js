import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const languagesKeys = Object.keys(country.languages)
  const languagesValues = Object.values(country.languages)
  const languages = languagesKeys.map((key, index) => {
    return {
      key,
      language: languagesValues[index]
    }
  })
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        const latlng = [response.data[0].lat, response.data[0].lon]
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {
            setWeather({
              temp: response.data.main.temp,
              icon: response.data.weather[0].icon,
              wind: response.data.wind.speed
            })
          })
      })
  }, [country])

  return <div>
    <h1>{country.name.common}</h1>
    <div>{`capital ${country.capital[0]}`}</div>
    <div>{`area ${country.area}`}</div>
    <h3>languages:</h3>
    <ul>
      {
        languages.map(languagesObj => <li key={languagesObj.key}>
          {languagesObj.language}
        </li>)
      }
    </ul>
    <img src={country.flags.png} alt={`${country.name.common}-flag`} width="150px" />
    {
      weather && <>
        <h2>{`Weather in ${country.capital[0]}`}</h2>
        <div>{`temperature ${weather.temp} Celsius`}</div>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${country.capital[0]}-weather`} />
        <div>{`wind ${weather.wind} m/s`}</div>
      </>
    }
  </div>
}

export default Country
