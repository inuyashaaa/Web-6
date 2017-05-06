const mongoose = require('mongoose');

const usersModel = require('./usersModel');
const token = require('../../utilities/token');

var createUser = (data, callback) => {
  usersModel.findOne({})
    .select('id')
    .sort({id : -1})
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        var id;
        if (doc && doc.id) {
          id = doc.id + 1;
        } else {
          id = 1;
        }
        data.id = id;
        usersModel.create(data, (err, doc) => {
          if (err) {
            console.log(err);
            console.log('message', err.message);
            console.log('error message', err.errmsg);
            callback(err);
          } else {
            callback(null,doc);
          }
        })
      }
    })
}

var getUserByUsername = (username, callback) => {
  try {
    usersModel.findOne({username : username}).exec((err, user) => {
      if (err) {
        callback(err);
      } else {
        callback(null, user);
      }
    })
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

var searchUserByUsernameAndEmail = (searchString, callback) => {
  try {
    usersModel.find({ $text: { $search: searchString } }).exec((err, doc) => {
      if (err) {
        callback(err);
      } else {
        callback(null, doc);
      }
    })
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

var signIn = (data, callback) => {
  if (data && data.username && data.password) {
    getUserByUsername(data.username, (err, user) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          data.password = hash;
          console.log('hash',hash);
        })
      })
    })
  }
}

module.exports = {
  createUser,
  searchUserByUsernameAndEmail
}
