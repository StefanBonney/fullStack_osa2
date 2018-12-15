import React from 'react';
import Henkilo from './Henkilo'
import personService from './personService'
import Notification from './Notification'
import './index.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      ilmoitus: '',
      rajaaName: '',
      personsToShow: []
    }
  }

//_______________________________________[GET PERSONS]
  componentWillMount(){
    console.log('1:PERSONS', this.state.persons)
   personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
    })
    console.log('2:PERSONS', this.state.persons)
  }//componentWillMount
//____________________________________


//_________________________________________[ADD PERSON]
  addPerson = (event) => {
    event.preventDefault() 

  
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }//personObject

    const name = personObject.name
    const allNames = this.state.persons.map(person => person.name)
    if(allNames.includes(name) === false)
    {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            ilmoitus: `Lisättiin henkilö ${personObject.name}`
          })
          setTimeout(() => {
            this.setState({ilmoitus:''})
          }, 5000)
      })//personService(create)
    }//if 
    else{
      const index = allNames.indexOf(name)
      const existingObject = this.state.persons[index]
      const id = existingObject.id
      window.confirm(existingObject.name + ' on jo luettelossa, korvataanko vanha numero uudella?')
      this.setState({
        persons: this.state.persons.filter(person => person.id !== existingObject.id),
      })
      personService
        .update(id, existingObject)
        .then(updatedPerson => {
          this.setState({
            persons: this.state.persons.concat(updatedPerson),
            newName: '',
            newNumber: '',
            ilmoitus: `Päivitettiin henkilö ${personObject.name}`
          })
          setTimeout(() => {
            this.setState({ilmoitus:''})
          }, 5000)
      })//personService(update)
      .catch(error => {
        alert(`'${existingObject.name}' on jo valitettavasti poistettu`)
        this.setState({ persons: this.state.persons.filter(n => n.id !== id ) })
      })


    } 

  }//addPerson    
//___________________________________________


//_____________________________________________________[DELETE PERSON]  
  deletePerson = (personId) => {
  console.log(personId)
  personService.remove(personId)
    .then(response => {
      this.setState({
        persons: this.state.persons.filter( person => person.id !== personId),
        ilmoitus: `Poistettiin henkilö jonka id '${personId}'`
      })
      setTimeout(() => {
        this.setState({ilmoitus: null})
      }, 5000)
    })
}
//_________________________________________




//______________________________________________________[HANDLE FORM CHANGES]
  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }//handleNameChange

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }//handleNumberChnage

  handleRajaaChange = (event) => {
    const value = event.target.value
    const list = this.state.persons
    const personsToShow = list.filter( person => person.name.toLowerCase().includes(value))
    this.setState({
      rajaaName: event.target.value,
      personsToShow
    })
  }
//___________________________________________________________

  personList = () => {
    return(  
    <ul>
    {this.state.persons.map(person => (
      <div>
        <Henkilo
          name={person.name}
          number={person.number}
        />
        <button  onClick={() => {this.deletePerson(person.id)}}>x</button>
      </div>)
    )}
    </ul>
    )}  


//########################################################################################################[RENDER]
  render() {
  
  console.log(this.state.rajaaname)

  const rajaaNamesOrInitial = this.state.rajaaName ? 
    this.state.personsToShow :
    this.state.persons



  const persons = this.state.persons
  console.log('3:PERSONS', persons)

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        
        <form>
          <div>
            rajaa näytettäviä: <input value={this.state.rajaaName} onChange={this.handleRajaaChange}/>
          </div><br/>
        </form>

        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>
        <Notification ilmoitus={this.state.ilmoitus} />        
        <ul>
        {rajaaNamesOrInitial.map(person => 
          <div key={person.id} >
            <Henkilo
              name={person.name}
              number={person.number}
            />
            <button onClick={() => {this.deletePerson(person.id)}}>x</button>
          </div>
        )}
        </ul>

      </div>
    )
  }
}

export default App
