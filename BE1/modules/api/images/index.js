const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');
const usersController = require('../users/usersController');

const authorMiddleware = usersController.authorMiddleware;
const authenMiddleware = usersController.authenMiddleware;

var testmiddleware = (req, res, next) => {
  console.log('testmiddleware image');
  req.test = 'testmiddleware image';
  next();
}

Router.use(testmiddleware);

Router.post('/', authenMiddleware, authorMiddleware(1, 2),(req, res) => {
  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description,
    createBy : req.body.userId
  }

  console.log('post data ',req.body);

  //luu lai vao database
  imagesController.addImage(imageInfo, (err, doc) => {
    if (err) {
      console.log(err);
      res.send('co loi xay ra');
    } else {
      res.send('success');
    }
  });
});

Router.get('/', authenMiddleware, authorMiddleware(1, 1), (req, res) => {
  console.log('get image test middleware', req.test);
  try {
    imagesController.getAllCookedImages((err, doc) => {
       if (err) {
         console.log(err);
         res.send("Co loi xay ra, check di");
       } else {
         res.send(doc);
       }
     });
  } catch (e) {
    console.log(e);
    res.send("Co exception");
  }
})

Router.put('/', authenMiddleware, authorMiddleware(1, 3), (req, res) => {
  if (req.body.id) {
    var newData = {
      name : req.body.name,
      imageLink : req.body.imageLink,
      description : req.body.description
    }

    var result = imagesController.updateImageCollectionById(req.body.id, newData);

    res.send(result);
    return;
  }
  res.send(`Don't have id`);
})

Router.get('/testimage', (req, res) => {
  imagesController.getAllImages((err, doc) => {
    res.send(doc);
  })
})
Router.delete('/', authenMiddleware, authorMiddleware(1, 4), (req, res) => {

})

module.exports = Router;
