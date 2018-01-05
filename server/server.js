const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {Todo} = require('./models/todo')

let app = express()
let port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  console.log(req.body)
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    console.log('Unable to save ', err)
    res.status(400).send(err)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    })
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id not found')
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Id not found')
    }
    res.send(todo)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.listen(port, () => {
  console.log('Started on port ', port)
})

module.exports = {
  app
}
