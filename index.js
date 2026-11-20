require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())  // parse application/json
app.use(morgan('tiny'))
morgan.token('body', function (req){
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Phonebook backend</h1>')
  })


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()  // 204 no content
  })

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({ error: 'name must be unique' })
    }
    const person = {
        id: Math.floor(Math.random() * 100000),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
