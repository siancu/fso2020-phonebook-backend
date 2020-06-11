require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const personsRouter = require('./personsRouter')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

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

app.use('/api/persons', personsRouter)

app.get('/info', async (req, res) => {
  const numberOfPersons = await Person.countDocuments({})
  console.log(numberOfPersons)
  const response =
    `<p>Phonebook has info for ${numberOfPersons} people</p>
     <p>${new Date().toString()}</p>
    `
  res.send(response)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
