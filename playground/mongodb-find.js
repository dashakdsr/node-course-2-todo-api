// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

let obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  // db.collection('Todos').find({_id: new ObjectID('5a4e0bfa756f464f219dcb02')}).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err)
  // })

  db.collection('Users').find({name: 'Dasha'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch', err)
  })
  // db.close()
})
