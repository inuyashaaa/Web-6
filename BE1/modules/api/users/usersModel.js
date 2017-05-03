const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var usersSchema = new Schema({
  id : { type : Number, required : true, unique : true },
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  email : { type : String, required : true, unique : true },
  avatar : { type : String , default : ''},
  
});

usersSchema.pre('save', (next) => {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})
module.exports = mongoose.model('users', usersSchema);
