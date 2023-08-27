const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Return a list of phonebook entries
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Returns description of the amount of phonebook entries with the current timestamp of the GET request
app.get('/api/info', (request, response) => {
    let currentTime = new Date()
    let content = `<p>The phonebook has info for ${persons.length} people</p><p>${currentTime}</p>`

    response.send(content)
})

// Returns a specific phonebook entry based on the ID
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id)

    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})