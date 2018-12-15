import React from 'react';
import Countries from './Countries'
import OneCountry from './OneCountry'
import countryService from './countryService'
import Notification from './Notification'
import './index.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      countriesToShow: [],
      singleCountry: null,
      rajaaCountry: '',

      ilmoitus: '',
    }
  }

//_______________________________________[GET COUNTRIES]
  componentWillMount(){
    console.log('1:COUNTRIES', this.state.countries)
   countryService
      .getAll()
      .then(countries => {
        this.setState({ countries })
    })
    console.log('2:COUNTRIES', this.state.countries)
  }//componentWillMount
//____________________________________

//______________________________________________________[INPUT CHANGES]

  handleRajaaChange = (event) => {

    const value = event.target.value //get value from change
    this.setState({rajaaCountry: event.target.value})
    const countries = this.state.countries 
    const countriesToShow = countries.filter( country => country.name.toLowerCase().includes(value.toLowerCase())) //change countries list according to change
    console.log('countriesToShow', countriesToShow)
    console.log('countriesToShow.length', countriesToShow.length)

    if(countriesToShow.length === 1){ // >>>>>> check whether to show --ONE-- country
      const singleCountry = countriesToShow[0]
      this.setState({
        // rajaaName: event.target.value, //set the rajaus
        singleCountry, //set countries to show
        ilmoitus:''
      })
    }
    if(countriesToShow.length > 10 ){ // >>>>>> check whether too many --
      this.setState({
        // rajaaName: event.target.value, //set the rajaus
        countriesToShow: [],  //set countries to show
        ilmoitus: 'too many matches, specify another filter'
      })
    }
    else{// >>>>>>> check whether to show --MANY-- country
      this.setState({
      //rajaaName: event.target.value,
      countriesToShow, //set the countries to show
      ilmoitus: ''
      })
    }
  }
//___________________________________________________________
 
//______________________________________________________[CLICK CHANGES]

 pickCountry = (event) => {

  console.log(
    'TARGET', event, 
    'event.target', event.target, 
    'event.target.tagName', event.target.tagName,
    'ID', event.target.id
    )
    const ids = this.state.countries.map( country => country.alpha3Code)
    const position = ids.indexOf(event.target.id)
    const singleCountry = this.state.countries[position]
    this.setState({
      singleCountry,
      countriesToShow: {length: 1} 
    })

 }

//___________________________________________________________

//########################################################################################################[RENDER]
  render() {
  
  const countries = this.state.countries
  console.log('3:COUNTRIES', countries)

    return (
      <div>
        <form>
          <div>
            find countries: <input value={this.state.rajaaCountry} onChange={this.handleRajaaChange}/>
          </div><br/>
        </form>
        
        <Notification ilmoitus={this.state.ilmoitus} />    

        <ul>
        {this.state.countriesToShow.length === 1 ? 
          <OneCountry country={this.state.singleCountry} />
          :
          <Countries countries={this.state.countriesToShow} pickCountry={this.pickCountry} />
        }
        </ul>

      </div>
    )
  }
  
}

export default App
