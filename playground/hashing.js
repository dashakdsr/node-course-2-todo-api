const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let password = '123abc'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash)
    })
})

let hashedPassword = '$2a$10$XlQ06DRjpi01dYnkuvjh6uo3XweX8RcuTxWLmAu84mLVnqK5AUvfO'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// let data = {
//   id: 10
// }
//
// let token = jwt.signin(data, '123abc')
// let decoded = jwt.verify(token, '123abc')

// let message = 'I am user number 3'
// let hash = SHA256(message).toString()
//
// console.log(hash)

// let data = {
//   id: 4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// token.data = 65
// token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed. Do not trust')
// }
