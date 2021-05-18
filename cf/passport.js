const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('../model/User.js');
const db2 = require('../cf/db');

module.exports = (passport) => {

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'loginni xato teridingiz' });
                }
               bcrypt.compare(password, user.password,(err, isMatch)=>{
                   if(err)console.log(err);
                   if(isMatch){
                       done(null, user)
                   }
                   else{
                       done(null, false, {message:"parol xato terildi"})
                   }

               })
            });
        }
    ));
}