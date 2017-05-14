var missingData     = { message : "Missing data!" };
var emptyData       = { message : "Empty data!" };
var loginFail       = { message : "Login fail!" };
var wrongPassword   = { message : "Wrong username or password!" };
var usernameExists  = { message : "Username is already exist!" };
var notFound        = { message : "Not found!" };
var unauthenticated = { message : "Unauthenticated!" };
var unauthorized    = { message : "Forbidden!" };
var stwr            = { message : "Something went wrong!" };

var success = { success: true };
var created = { success: "Created!" };

var mongoError = function(err) {
  if(!err) return null;
  if(err.errmsg || err.message) {
    return { message: err.errmsg || err.message };
  }
  if(err instanceof Array) {
    var message = '';
    err.forEach(function(e) {
      message += e.message || e.errmsg || 'Something went wrong!' + '\r\n';
    })
    return { message };
  } else {
    var message = '';
    Object.keys(err).forEach(function(key) {
      message += err[key].message || err[key].errmsg || 'Something went wrong!' + '\r\n';
    })
    return { message };
  }
}

//log error vao file

//log error vao database

module.exports = {
  missingData,
  emptyData,
  loginFail,
  wrongPassword,
  usernameExists,
  notFound,
  unauthenticated,
  unauthorized,
  stwr,
  success,
  created,
  mongoError
}
