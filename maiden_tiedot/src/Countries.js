import React from 'react'

const Country= ({countries, pickCountry}) => {
    return(
        <div>
            {countries.map(country => 
            <p onClick={pickCountry} key={country.alpha3Code} id={country.alpha3Code}>
            {country.name}
            </p>)}
        </div>
    )
}

export default Country