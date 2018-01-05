// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

let obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
  //   console.log(res)
  // })
  //
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
  //   console.log(res)
  // })

  // db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((res) => {
  //   console.log(res)
  // })

  // db.collection('Users').deleteMany({name: 'Dasha'}).then((res) => {
  //   console.log(res)
  // })

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a4e0d64f5e3b75028ddb06e')}).then((res) => {
    console.log(res)
  })

  // db.close()
})
