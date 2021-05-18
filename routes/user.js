const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/register', function (req, res, next) {
    res.render('register', { title: "ro'yxatdan o'tish sahifasi" });

});
router.post('/register', function (req, res, next) {
    req.checkBody('name', 'Iltimos Ismingizni kiriting').notEmpty();
    req.checkBody('username', 'Iltimos NIK kiriting').notEmpty();
    req.checkBody('email', 'Iltimos Email kiriting').notEmpty();
    req.checkBody('password', 'Iltimos Parol kiriting').notEmpty();
    req.checkBody('passwowor1', 'Iltimos Parolni tasdiqlang').equals(req.body.password);


    const errors = req.validationErrors()




    if (errors) {
        res.render('register', {
            title: "Ma'lumot kiritilmadi",
            errors: errors
        })
    } else {
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
       
        
        const user = new User({
            name : name,
            username : username,
            email : email,
            password : password,
             })
        

        bcrypt.genSalt(10, (err, pass) =>{
            bcrypt.hash(user.password, pass, (err, hash)=>{
                if(err)console.log(err);
                user.password=hash;
                user.save((err)=>{
                    if(err) console.log(err);
                    else{
                        req.flash("success", " ro'yxatdan o'tdingiz");
                        res.redirect('/login');
                    }
                })
            })
        })
    }
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: "saytga kirish" });

});

module.exports = router;
            

