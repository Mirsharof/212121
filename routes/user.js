const express = require('express');
const Music = require('../model/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const e = require('express');

/* GET users listing. */
router.get('/register', function (req, res, next) {
    res.render('register', { title: "ro'yxatdan o'tish sahifasi" });

});
router.post('/register', function (req, res, next) {
    req.checkBody('name', 'Iltimos Ismingizni kiriting').notEmpty();
    req.checkBody('username', 'Iltimos NIK kiriting').notEmpty();
    req.checkBody('email', 'Iltimos Email kiriting').notEmpty();
    req.checkBody('password', 'Iltimos Parol kiriting').notEmpty();
    req.checkBody('passwowor1', 'Iltimos Parolni tasdiqlang').equals(req.body.password).notEmpty();


    const errors = req.validationErrors()
    if (errors) {
        res.render('register', {
            title: "Ma'lumot kiritilmadi",
            errors: errors
        })
    } else {
        const user = new User({
            name : name,
            username : username,
            email : mail,
            password : password,
            password1: password

        })
        user.name = req.body.name
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password
        user.password1 = req.body.password1
        

        bcrypt.genSalt(10, (err, pass) =>{
            bcrypt.hash(user.password, password, pass, (err, hash)=>{
                if(err)console.log(err);
                user.password=hash;
                user.save((err)=>{
                    if(err) console.log(err);
                    else{
                        req.flash("success", " ro'yxatdan o'tdingiz");
                        res.render('/login');
                    }
                })
            })
        })
    }
});

            // user.save((err) => {
            //     if (err) console.log(err);
            //     else {
            //         req.flash('alert alert-success', 'royxatga olindi')
            //         res.redirect('/')
            //     }
            // })

            router.get('/login', function (req, res, next) {
                res.render('login', { title: "saytga kirish" });
            
            });


module.exports = router;
