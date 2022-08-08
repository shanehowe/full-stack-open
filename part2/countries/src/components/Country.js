import { WeatherData } from './WeatherData'

export const Country = ({ countries }) => {
    return (
        <>
            <h2>{countries[0].name.common}</h2>
            <p>Capital: {countries[0].capital}</p>
            <p>Area: {countries[0].area}</p>
            <h4>Languages:</h4>
            {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
            <img src={countries[0].flags.png} alt={`${countries[0].name.common} flag`}/>
            <div>
                <WeatherData city={countries[0].capital[0]}/>
            </div>
        </>
    )
}