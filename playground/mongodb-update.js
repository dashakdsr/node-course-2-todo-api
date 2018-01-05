// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

let obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a4e10a97df6900d2c698ee6')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a4e0d6fabdfc85037667f8f')
  }, {
    $set: {
      name: 'Dasha'
    },
    $inc: {
      age: -2
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  })

  // db.close()
})
