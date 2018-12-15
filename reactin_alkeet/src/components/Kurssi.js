import React from 'react'

const Otsikko = ({nimi}) => {
    return(
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Sisalto = ({osat}) => {
    return(
        <div >
            {osat.map(osa => <Osa nimi={osa.nimi} tehtava={osa.tehtavia} key={osa.id}/>)}
        </div>
    )
}

const Osa = ({ nimi, tehtava}) => {
    return(
        <div>
            <p>{nimi} {tehtava}</p>
        </div>
    )
}

const sum = (acc, val) => acc + val 

const Yhteensa = ({osat}) => {
    const values = osat.map( osa => osa.tehtavia)
    console.log(values)
    const numerotAdd = values.reduce(sum)  
    return(
        <div>
            <p>yhteensä {numerotAdd} tehtävää </p>
        </div>
    )
}


const Kurssi = ({kurssi}) => {
    return(
        <div key>

            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi