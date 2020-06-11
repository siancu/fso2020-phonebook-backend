var express = require('express')
const Person = require('./models/person')

var router = express.Router()

const getPersons = async (req, res) => {
  const persons = await Person.find({})
  return res.json(persons)
}

const getPerson = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
}

const updatePerson = async (req, res, next) => {
  try {
    const body = req.body;
    const person = await Person.findOneAndUpdate({name: body.name}, {number: body.number}, {new: true})
    res.json(person)
  } catch (e) {
    next(e)
  }
}

const createPerson = async (req, res, next) => {
  const body = req.body;

  if (!body.number) {
    return res.status(400).json({error: 'the phone number is missing'})
  }

  if (!body.name) {
    return res.status(400).json({error: 'the name is missing'})
  }

  const personsArray = await Person.find({ name: body.name})
  const existingPerson = personsArray[0]
  if (existingPerson) {
    return updatePerson(req, res);
  } else {
    const person = new Person({
      name: body.name,
      number: body.number
    })

    try {
      const savedPerson = await person.save()
      res.json(savedPerson.toJSON())
    } catch (e) {
      next(e)
    }
  }
}

const deletePerson = async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}

router.get('/', getPersons)
router.get('/:id', getPerson)
router.delete('/:id', deletePerson)
router.post('/', createPerson)
router.put('/:id', updatePerson)


module.exports = router
