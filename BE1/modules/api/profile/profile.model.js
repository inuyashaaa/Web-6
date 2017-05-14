const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const authorSchema = new mongoose.Schema({
  page        : { type: Number, require: [ true, 'Profile Author page Number required!'], default: 0 },
  pageName    : { type: String, require: [ true, 'Profile Author page Name required!'  ], default: ''},
  read        : { type: Boolean, require: true, default: false },
  create      : { type: Boolean, require: true, default: false },
  update      : { type: Boolean, require: true, default: false },
  delete      : { type: Boolean, require: true, default: false }
}, { _id: false, versionKey: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, require: [ true, 'Profile name required!' ], trim: true, unique: true, default: ''},
  authors: {
    type: [authorSchema],
    default: []
  },
  createBy: {
    user: { type: ObjectId, ref: 'users', default: null },
    time: { type: Date }
  },
  updateBy: {
    user: { type: ObjectId, ref: 'users', default: null },
    time: { type: Date }
  }
})

module.exports = mongoose.model('profiles', profileSchema);
