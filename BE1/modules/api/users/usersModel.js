const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var usersSchema = new Schema({
  id : { type : Number, required : true, unique : true },
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  email : { type : String, required : true }
});

module.exports = mongoose.model('users', usersSchema);
