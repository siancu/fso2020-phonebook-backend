const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/info', (req, res) => {
  const response =
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${new Date().toString()}</p>
    `
  res.send(response)
})

app.get('/api/persons', (req, res) => {
  return res.json(persons)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
