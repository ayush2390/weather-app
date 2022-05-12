import React, { useEffect, useState } from 'react'
import '../style/style.css'
import WeatherDetails from './WeatherDetails'

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState('mumbai')
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherDetails  = async() => {
      try {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=edfbb71f85e1fcfb2f25c50ebd685682`
        let res = await fetch(url);
        let data = await res.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const{country, sunset} = data.sys;

        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weatherType,
          name,
          speed,
          country,
          sunset
        }

        setTempInfo(myNewWeatherInfo)

        //console.log(data)
      } catch (error) {
        //console.log(error)
      }

    }

useEffect(() =>{
  getWeatherDetails()
}, [])

  return (
   <> <div className='wrap'>
      <div className='search'>
          <input type='search' placeholder='type city' id='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <button className='searchButton' onClick={getWeatherDetails}>Search</button>
      </div>
    </div>
    <WeatherDetails {...tempInfo} /></>
  )
}

export default SearchMain
