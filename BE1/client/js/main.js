var allUserTemplate;
var allImageTemplate;

$(document).ready(function() {
  checkToken();
})

function checkToken() {
  var userLogin = false;
  $.get("../api/users/me", function(res) {
    if (res.username) {
      $('#username_label').html(res.username);
      $('#user_label').show();
      $('#sign_in_form').hide();
    } else {
      $('#user_label').hide();
      $('#sign_in_form').show();
    }
  })
}

function signin() {
  username = $('#username').val();
  password = $('#password').val();
  $.ajax({
    type : "post",
    url : "/api/users/signin",
    data : { username , password }
  }).then(function(res) {
    if (res.username) {
      $('#username_label').html(res.username);
      $('#user_label').show();
      $('#sign_in_form').hide();
    } else {
      alert(res);
    }
  }).fail(function(err) {
    console.log(err);
  });
}

function signout() {
  $.ajax({
    type : "delete",
    url : "api/users/signout"
  }).then(function(res){
    $('#user_label').hide();
    $('#sign_in_form').show();
    alert(res);
  })
}

function requestImage(itemTemplate){
  $.ajax({
    type  : "get",
    url   : "api/image"
  }).then(function(data){
    var displayData = {};
    displayData.items = data;
    var itemHtml = $(itemTemplate(displayData));
    $('#item_list').html(itemHtml);
  }).fail(function(error){
    console.log(error);
  });
}

function searchImage(itemTemplate) {
  var searchString = $('#search_image_string').val();
  $.ajax({
    type : "get",
    url  : "api/image?s=" + searchString
  }).then(function(data){
    var displayData = {};
    displayData.items = data;
    var itemHtml = $(itemTemplate(displayData));
    $('#item_list').html(itemHtml);
  }).fail(function(error){
    console.log(error);
  });
}

function likeImage(imageId) {
  var data = imageId;
  //console.log(id);
  $.ajax({
    type : "post",
    url : "../api/image/like",
    data : {
      id : imageId
    }
  }).then(function(result){
      console.log(result);
      //requestImage(itemTemplate);
  }).fail(function(err) {
      console.log(err);
  })
}

function getEditImage(imageEditTemplate) {
  var id = getQueryStringValue("id");
  if (id) {
    $.ajax({
      type : "get",
      url : "../api/image?id=" + id,
    }).then(function(data){
      var imageHtml = $(imageEditTemplate(data));
      $('#image_info').html(imageHtml);
    }).fail(function(error) {
      console.log(error);
    })
  } else {
    var imageHtml = $(imageEditTemplate());
    $('#image_info').html(imageHtml);
  }
}

function updateImage(data) {
  $.ajax({
    type : "put",
    url : "../api/image",
    data : data
  }).then(function(res){
    alert('done');
  }).fail(function(error) {
    console.log(error);
  })
}

function requestUser() {
  $.ajax({
    type : "get",
    url  : "/api/users"
  }).then(function(data){
    renderUser(data);
  }).fail(function(error){
    console.log(error);
  })
}

function searchUser(searchText) {
  $.ajax({
    type : "get",
    url : "/api/users?s=" + searchText
  }).then(function(data) {
    renderUser(data);
  }).fail(function(error){
    console.log(error);
  })
}

function getEditUser(userEditTemplate) {
  var id = getQueryStringValue("id");
  if (id) {
    $.ajax({
      type : "get",
      url : "/api/users?id=" + id
    }).then(function(data) {
      var userHtml = $(userEditTemplate(data));
      $('#user_info').html(userHtml);
    }).fail(function(error) {
      console.log(error);
    })
  }
}

function updateUser(data) {
  $.ajax({
    type : "put",
    url  : "/api/users"
  }).then(function(data){
    alert('done');
  }).fail(function(error){
    console.log(error);
  })
}

function renderUser(data) {
  var userHtml = $(allUserTemplate(data));
  $('#users_list').html(userHtml);
}



function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
