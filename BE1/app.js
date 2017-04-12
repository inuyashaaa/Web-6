console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');

var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('./public/index.html');
})

app.get('/image/add', (req, res) => {
  //khai bao object
  var imageInfo = {
    name : req.query.name,
    imageLink : req.query.imageLink,
    description : req.query.description
  }
  //luu lai vao file
  fs.writeFileSync('imageData.json', JSON.stringify(imageInfo));
  //bao thanh cong
  res.send('Success');
})

app.get('image/get', (req,res) => {
  
})

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
