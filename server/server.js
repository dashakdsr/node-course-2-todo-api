require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate')

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

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id not found')
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Id not found')
    }
    res.send({todo})
  }, (err) => {
    res.status(400).send(err)
  })
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Id not found')
  }

  let body = _.pick(req.body, ['text', 'completed'])
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {
    $set:
      body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send('Id not found')
    }

    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})

app.post('/users', (req, res) => {
  console.log(req.body)
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)

  user.save().then((doc) => {
    return user.generateAuthToken()
  }, (err) => {
    console.log('Unable to save ', err)
    res.status(400).send(err)
  }).then((token) => {
    res.header('x-auth', token).send(user)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.listen(port, () => {
  console.log('Started on port ', port)
})

module.exports = {
  app
}
