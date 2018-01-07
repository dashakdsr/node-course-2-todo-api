const request = require('supertest')
const expect = require('expect')
const {ObjectID} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, users, populateTodos, populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should cot create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })
})

describe('GET /todos', () => {
  it('should GET all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should GET single todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done)
  })

  it('should return 404 if id not found', (done) => {
    let hexID = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done)
  })
})

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(todos[0]._id.toHexString())
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Todo.findById(todos[0]._id.toHexString()).then((todo) => {
            expect(null).toNotExist()
            done()
          }).catch((e) => {
            done(e)
          })
        })
    })

    it('shoult return 404 if todo not found', (done) => {
      let hexID = new ObjectID().toHexString()
      request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done)
    })

    it('should return 404 if object id is invalid', (done) => {
      request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done)
    })
  })

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .send({
        text: 'Updated text',
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('Updated text')
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })

  it('should clear completedAt when tod is not completed', (done) => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .send({
        text: 'Updated text',
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('Updated text')
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
})

describe('GET /users/me', () => {
  it('shoult return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  })

  it('shoutl return 401 if not authenticated', (done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({})
        })
        .end(done)
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@example.com'
    let password = 'example'

    request(app)
      .post('/todos')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.find({email}).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotBe(password)
          done()
        })
      })
  })

  it('should return validation error if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'ans',
        password: 'ggrtg'
      })
      .expect(400)
      .end(done)
  })

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'rfrtg'
      })
      .expect(400)
      .end(done)
  })
})
