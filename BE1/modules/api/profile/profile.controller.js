const profileModel = require('./profile.model');
var testTemplate = {
  page : 1,
  pageName : "api/image",
  read : true,
  create : true,
  update : true,
  delete : false
}

var testProfile = {
  name : 'testProfile1',
  authors : [],
}

var addProfile = (callback) => {
  testProfile.authors.push(testTemplate);
  profileModel.create(testProfile, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

module.exports = {
  addProfile
}
