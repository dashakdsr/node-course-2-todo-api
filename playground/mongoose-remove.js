const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((res) => {
//   console.log(res)
// })

Todo.findOneAndRemove({
  _id: '5a50e0040a694ade3f865d6a'
}).then((todo) => {
  console.log(todo)
})

// Todo.findByIdAndRemove('5a50e0040a694ade3f865d6a').then((todo) => {
//   console.log(todo)
// })
