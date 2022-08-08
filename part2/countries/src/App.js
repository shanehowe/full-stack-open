import axios from 'axios';
import { useState, useEffect } from 'react'
import { CountryList } from "./components/CountryList"

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
         .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value))
    setCountries(filtered)
  }


  return (
    <>
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
    <CountryList countries={countries} setCountries={setCountries}/>
    </>
  );
}

export default App;
