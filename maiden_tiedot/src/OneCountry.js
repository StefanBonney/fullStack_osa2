import React from 'react'

const OneCountry = ({ country}) => {
    return(
        <div key={country.alpha3Code}>
            <h1>{country.name}</h1>

            <p>capital: {country.capital}</p>
      
            <p>population: {country.population}</p>

            <img src={country.flag} alt="flag" className="flag"/>            
        </div>
    )
}

export default OneCountry