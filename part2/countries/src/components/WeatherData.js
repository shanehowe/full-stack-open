import axios from "axios"
import { useState, useEffect } from "react"

export const WeatherData = ({ city }) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
             .then(response => setWeather(response.data))
    }, [])


    return weather.main ? 
                <>
                <h3>Weather in {city}</h3>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                <p>Wind {weather.wind.speed} m/s</p>
                </> : <p>Loading...</p>
}