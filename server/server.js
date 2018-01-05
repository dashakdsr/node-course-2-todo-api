const express = require('express')
const bodyParser = require('body-parser')

const {User} = require('./models/user')
const {Todo} = require('./models/todo')

let app = express()

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

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {
  app
}
