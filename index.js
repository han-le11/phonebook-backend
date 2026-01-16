const http = require('http')  
const express = require('express')
const app = express()

let phonebook = [
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


app.get('/', (request, response) => {
  response.send(JSON.stringify(phonebook))
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
  })

// use the createServer method of the http module to create a new web server
//const app = http.createServer((request, response) => {
    //response.writeHead(200, { 'Content-Type': 'application/json' })
    //response.end(JSON.stringify(phonebook))
  //})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)