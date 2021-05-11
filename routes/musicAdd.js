const express = require('express');
const Music = require('../model/Music');
const router = express.Router();

/* GET users listing. */
router.get('/add', function (req, res, next) {
  res.render('MusicAdd', { title: "Musiqa qo`shish sahifasi" });
});


/* Post users listing. */
router.post('/add', function (req, res, next) {
  // console.log('jo`natdik');

  req.checkBody('name', ' iltimos musiqa nomi kiriting').notEmpty();
  req.checkBody('singer', ' iltimos qo\'shiqchini kiriting').notEmpty();
  req.checkBody('comment', ' iltimos musiqaga izoh kiriting').notEmpty();
  
  const errors = req.validationErrors()
  if(errors){
    res.render('musicAdd', {
      title: "musiqa kiritilmadi",
      errors: errors
    })
  }else{
    const music = new Music()
    music.name = req.body.name
    music.singer = req.body.singer
    music.comment = req.body.comment

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash('alert alert-success', 'musiqa kiritildi')
        res.redirect('/')
      }
    })
  }
});









module.exports = router;
