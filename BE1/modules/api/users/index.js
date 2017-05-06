const express = require('express');
const Router = express.Router();

const usersController = require('./usersController');

Router.post('/signup', (req, res) => {
  var newUser = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    avatar : req.body.avatar
  }

  usersController.createUser(newUser, (err, doc) => {
    if (err) {
      console.log(err);
      res.send('Co loi');
    } else {
      res.send('Tao user thanh cong');
    }
  })
});

Router.get('/search', (req, res) => {
  usersController.searchUserByUsernameAndEmail(req.query.searchString, (err, doc) => {
    if (err) {
      console.log(err);
      res.send('co loi');
    } else {
      res.send(doc);
    }
  })
})

module.exports = Router;
