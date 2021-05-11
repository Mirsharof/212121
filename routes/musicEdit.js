const express = require('express');
const Music = require('../model/Music');
const router = express.Router();

/* GET users listing. */
router.get('/edit/:id', function(req, res, next) {
//   res.render('MusicEdit', {title: "Musiqa o`zgartirish sahifasi"});

  Music.findById(req.params.id, (err, musics)=> {
      console.log(musics);
    res.render('musicedit', {
        title: 'musiqa o`zgartirish sahifasi',
        musics,
    })
  })
});


/* Post users listing. */
router.post('/edit/:id', function(req, res, next) {
    const music = {}
    music.name =req.body.name
    music.singer =req.body.singer
    music.comment =req.body.comment

    const query = {_id: req.params.id}
    Music.update(query, music, (err)=>{
        if(err)console.log(err);
        res.redirect("/")
    })
});



module.exports = router;
