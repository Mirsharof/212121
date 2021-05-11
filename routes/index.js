var express = require('express');
const Music = require('../model/Music')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // const musics = [
  //   {
  //     id: 1,
  //     name: 'Sevinch',
  //     singer: "zo`r",
  //     comments: "norm"
  //   },
  //   {
  //     id: 2,
  //     name: 'Sevinch2',
  //     singer: "zo`r2",
  //     comments: "norm2"
  //   },
  //   {
  //     id: 3,
  //     name: 'Sevinch3',
  //     singer: "zo`r3",
  //     comments: "norm3"
  //   },
  // ]

    Music.find({}, (err, musics)=> {
    if(err) console.log(err);
    else{
      res.render('index', { title: 'Bosh sahifa', musics });
    }
  })

});

module.exports = router;
