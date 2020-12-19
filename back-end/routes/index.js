const express=require('express')
const router = express.Router()
const createRouter=require('./create')
const userRouter=require('./user')
const reviewRouter=require('./review')
const searchRouter=require('./search')
const authRouter=require('./auth')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.use('/', createRouter)
router.use('/',userRouter)
router.use('/',reviewRouter)
router.use('/',searchRouter)
router.use('/users',authRouter)

// // Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

module.exports=router