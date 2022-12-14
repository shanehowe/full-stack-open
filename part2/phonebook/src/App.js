import personsServices from './services/persons';
import { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState([null])

  // get all persons
  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  // add person
  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = { name: newName, number: newNumber }

    const duplicate = persons.filter(person => person.name === newPerson.name)

    if (duplicate.length >= 1) {
      
      if (window.confirm(`${newPerson.name} is already in your phonebook, replace old number with new one?`)) {
        personsServices
          .update(duplicate[0].id, newPerson)
          .then(returnedPerson => {
            const changedPerson = {...newPerson, number: newNumber}
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : changedPerson))
            setMessage([`${newPerson.name} updated!`, 'green'])
          })
          .catch(error => {
            setMessage([`${newPerson.name} has already been removed from the server.`, 'red'])
          })
      }

    } else {

      personsServices
            .create(newPerson)
            .then(response => {
              setPersons(persons.concat(newPerson))

              setMessage([`${newPerson.name} added!`, 'green'])
            })
            .catch(error => {
              setMessage([error.response.data.error, 'red'])
              console.log(error.response.data.error)
            })
    }

    setTimeout(() => {
      setMessage([null])
    }, 3000)

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    const search = event.target.value
    setFilter(search)
    const renderPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(search))
    setPersons(renderPersons)
  }

  const handleDelete = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      personsServices
          .remove(id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== id))

            setMessage([`${name} has been deleted!`, 'green'])
      
            setTimeout(() => {
              setMessage([null])
            }, 3000)
          })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
