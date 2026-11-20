const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// DO NOT SAVE PASSWORD TO GITHUB!!
const password = process.argv[2]
const url = `mongodb+srv://lenmhan_db_user:${password}@cluster0.vclnpnb.mongodb.net/`

mongoose.set('strictQuery', false)
mongoose.connect(url, )

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// compile model "Person" to the collection "persons"
const Person = mongoose.model('Person', personSchema) // model definition

// if there are 3 args (node mongo.js <password>) print the whole phonebook, otherwise add the new contact to the phonebook
if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(p => console.log(p.name, p.number))
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}