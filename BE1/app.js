console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

const imagesController = require(__dirname + '/modules/images/imagesController');

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('./public/index.html');
})

app.post('/image', (req, res) => {
  //doc du lieu tu cai file imageData
  var imageInfoCollection = imagesController.fetchImageCollection();

  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  console.log('post data ',req.body);

  //push data moi vao collection
  imageInfoCollection.push(imageInfo);

  //luu lai vao file
  imagesController.saveImageCollection(imageInfoCollection);
  //bao thanh cong
  res.send('Success');
})

app.get('/image', (req,res) => {
  var imageInfoCollection = imagesController.fetchImageCollection();

  var htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })

  res.send(htmlString);
})

app.put('/image', (req, res) => {
  console.log(req.body);
})

app.delete('/image', (req, res) => {
  console.log(req.body);
})

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
