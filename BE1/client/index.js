const express = require('express');
const router = express.Router();

router.use('/libs',express.static(__dirname + '/libs'));
router.use('/css', express.static(__dirname + '/css'));
router.use('/js', express.static(__dirname + '/js'));

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

router.get('/image', (req, res) => {
  res.sendFile(__dirname + '/imageManager.html');
})

router.get('/image/edit', (req, res) => {
  res.sendFile(__dirname + '/editImage.html');
})

router.get('/user', (req, res) => {
  res.sendFile(__dirname + '/userManager.html');
})

router.get('/user/edit', (req, res) => {
  res.sendFile(__dirname + '/editUser.html');
})


module.exports = router;
