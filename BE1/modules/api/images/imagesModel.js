const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var imagesModel = new Schema({
  id : { type : Number, required: true },
  name : { type : String, default : '' },
  imageLink : { type : String , default : ''},
  description : { type : String },
  views : { type : Number, default : 0 },
  likes : [{
    likeBy : { type : Number }
  }],
  comments : [{
    comment : { type : String },
    commentBy : { type : Number }
  }]
}, { timestamps : true });

module.exports = mongoose.model('images', imagesModel);
