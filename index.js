const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')

//Activate JSON parser
app.use(express.json())

//Use CORS to allow communication to the front-end
app.use(cors())

//Serve static front-end build package
app.use(express.static('build'))

// Create a custom token for recording the request body 
morgan.token('response', function (req, res) { 
    return JSON.stringify(req.body)
})

//Activate the HTTP Requester Morgan middleware instance to monitor all the HTTP requests
//Tiny format preset which include the following ':method :url :status :res[content-length] - :response-time ms'
//Refer to the custom 'response' token to display the request body 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response'))

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

// Deletes a specific phonebook entry based on the ID
app.delete('/api/persons/:id', (request, response) => {
    // Convert the id request to a number
    const id = Number(request.params.id)

    // Filter persons array to exclude the ID as part of the Delete request param
    persons = persons.filter(persons => persons.id !== id)

    //Set a response code with 'no content' and end the request
    response.status(204).end()
})

// Create a new entry in the phonebook
app.post('/api/persons/', (request,response) => {

    // Assign request body content to variable
    const body = request.body 

    // Get a list of existing names in the phonebook
    const listOfNames = persons.map(person => person.name)

    // Error handling for handling the creation of new entries in the phonebook
    if(!body.name){
        console.log("The person's name is missing.")

        return response.status(400).json({
            error: "The person's name is missing."
        })
    } else if(!body.number){
        console.log("The person's phone number is missing.")

        return response.status(400).json({
            error: "The person's phone number is missing."
        })
    } else if(listOfNames.includes(body.name)){
        console.log("name must be unique.")

        return response.status(400).json({
            error: 'name must be unique.'
        })
    }

    // Create structure of the phonebook 
    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    // Create the new json response object
    response.json(person)

    
})



// Start Express server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Helper function to generate ID for phonebook
const generateID = () => {
    const maxNumber = 10000
    const randomId = Math.floor(Math.random() * maxNumber)
    return randomId;
}