const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')


// let id = '5a4fd373cd9ed940a401d468'
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   if (!todos) {
//     return console.log('Id not found')
//   }
//   console.log(todos)
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log(todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log(todo)
// }).catch((e) => {
//   console.log(e)
// })

let id = '5a4fb68d3bdd0c1f17d88970'

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found')
  }
  console.log(user)
}).catch((e) => {
  console.log(e)
})
