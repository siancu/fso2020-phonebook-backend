require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use('/api/persons', personsRouter)

// THIS HAS TO BE THE LAST THING BEFORE STARTING THE SERVER
// IT IS CRAZY, I KNOW !!!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
