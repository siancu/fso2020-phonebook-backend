const mongoose = require('mongoose')

let showPersons = false
let addPerson = false

if (process.argv.length === 3) {
  showPersons = true
} else if (process.argv.length === 5) {
  addPerson = true
} else {
  console.log('Please provide the password as an argument and optionally a name and a number: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-sfref.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (showPersons) {
  console.log('phonebook: ')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (addPerson) {
  const personName = process.argv[3]
  const personNumber = process.argv[4]

  const person = new Person({
    name: personName,
    number: personNumber
  })

  person.save().then(result => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}
