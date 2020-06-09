require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//app.use(morgan('tiny'))
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    // req.method === 'POST' ? JSON.stringify(req.body) : ''
    tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ')
}))

const generateId = () => {
  const min = Math.ceil(10);
  const max = Math.floor(1000000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/info', (req, res) => {
  const response =
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${new Date().toString()}</p>
    `
  res.send(response)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    return res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  // const id = Number(req.params.id)
  // persons = persons.filter(p => p.id !== id)
  //
  // return res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.number) {
    return res.status(400).json({error: 'the phone number is missing'})
  }

  if (!body.name) {
    return res.status(400).json({error: 'the name is missing'})
  }

  // const hasName = persons.some(p => p.name === body.name)
  // if (hasName) {
  //   return res.status(400).json({error: 'name must be unique'})
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
