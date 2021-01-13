const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models').User;

const { forwardAuthenticated } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, surname, email, password } = req.body;
  let errors = [];

  if (!name || !surname || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
    res.status(400).send({ message: 'Please enter all fields' })
  }
  console.log(req.body)

  if (errors.length > 0) {
    //facem in front
    // res.render('register', {
    //   errors,
    //   name,
    //   surname,
    //   email,
    //   password,
    //   password2
    // });
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.status(400).send({ message: 'Email already exists' })
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
                res.status(201).send({ message: 'user registered' })
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

router.get('/dashboard', (req, res, next) => {
  res.send(req.user.id);
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } =req.body
    if (!email || !password) {
      res.status(400).send({ ok: false, message: 'Please enter all fields' })
    }
    let user = await User.findOne({ where: { email: req.body.email } })
    let valid = await bcrypt.compare(req.body.password, user.password);
  
    if (valid) {
      res.send({ ok: true, id: user.id });
    } else {
      res.send({ ok: false,message:'Password/email doesnt match' });
    }
  }
  catch (err) {
    console.log(err)
  }
})

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

//update parola
router.patch('/updatePassword/:id', async (req, res) => {
  const { password, oldPassword } = req.body
  const user = await User.findByPk(req.params.id)
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
    } else {
      console.log('Nu se potrivesc parolele')
      res.status(400).send({
        message: "Passwords dont match"
      })
    }
  });

})
module.exports = router
