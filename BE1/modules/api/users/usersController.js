const mongoose = require('mongoose');

const usersModel = require('./usersModel');

var createUser = (data, callback) => {
  usersModel.find({})
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
        usersModel.create(data, (err, doc) => {
          if (err) {
            callback(err);
          } else {
            callback(null,doc);
          }
        })
      }
    })
}
