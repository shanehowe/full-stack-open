import React from "react";
import { Country } from "./Country";

export const CountryList = ({ countries, setCountries}) => {
    if (countries.length >= 250) return null;
    
    if (countries.length > 10) return <p>Too many matches specify another filter</p>;

    if (countries.length === 1) {
        return (
            <>
            <Country countries={countries}/>
            </>
            )
    }

    return (
        countries.map(country => (
           <div key={country.name.common}>
              {country.name.common}
               <button onClick={() => setCountries([country])}>show</button>
           </div>
        ))
     )
}

