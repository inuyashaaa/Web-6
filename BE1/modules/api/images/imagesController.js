const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data) => {
  imagesModel.create(data, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  })
}

var getAllImages = (cb) => {
  imagesModel.find({}, (err, doc) => {
    if (err) {
      cb(err);
    } else {
      cb(null, doc);
    }
  })
}


var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json','utf-8');

    imageInfoCollection = JSON.parse(contents);

  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var updateImageCollectionById = (id, newData) => {
  var imageInfoCollection = fetchImageCollection();

  if (id < 1 || id > imageInfoCollection.length)
    return 'Id invalid';
  else {
    imageInfoCollection[id-1] = newData;

    saveImageCollection(imageInfoCollection);
    return 'Success';
  }
}

module.exports = {
  fetchImageCollection,
  saveImageCollection,
  updateImageCollectionById,
  addImage,
  getAllImages
}
