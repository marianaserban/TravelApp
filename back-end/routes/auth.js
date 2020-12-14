const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models').User;

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name,surname, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !surname|| !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
console.log(req.body)
//   if (password.length< 6) {
    
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

  if (errors.length > 0) {
    // res.render('register', {
    //   errors,
    //   name,
    //   surname,
    //   email,
    //   password,
    //   password2
    // });
  } else {
    User.findOne({where:{ email: email }}).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.status(400).send({message:'Email already exists'})
        //asta nu e necesara, facem in react
        // res.render('register', {
        //   errors,
        //   name,
        //   surname,
        //   email,
        //   password,
        //   password2
        // });
      } else {
        const newUser = new User({
          name,
          surname,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                //res.redirect('/users/login');
                //aici trimit un token si in front-end verific daca l-am primit
                res.status(201).send({message:'user registered'})
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout -> se face din front-end pt ca am un token si cookie. Am un acces token si un refresh token
//Acces token se foloseste pe fiecare req si are timp de expirare mic (5 min)
//Refresh token este un cookie, are timp de expr 1 sapt 
//Cand acces token expira am nev de o fct care verif daca e expirat
//1. Daca nu e expr, se face req, userul e valid, e logat
//2. E expirat (se verif daca ex un cookie care se num refreshCookie)
//Daca exista, mai intai trim user un acces token nou, dupa continui cu req pe care l a  cerut el
//Daca nu exista, user nu e logat si il red catre login
router.post('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

//update
router.patch('/updatePassword/:id', async (req,res)=>{
    const {password,oldPassword}=req.body
    const user= await User.findByPk(req.params.id)
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  user
                    .save()
                    .then(user => {
                      res.send(user)
                    })
                    .catch(err => console.log(err));
                });
            })
        } else{
           console.log('Nu se potrivesc parolele')
            res.status(400).send({
            message: "Nu se potrivesc parolele"
            })
        }
      });
    
})
module.exports=router
