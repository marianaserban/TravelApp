const express=require('express')
const router = express.Router()
const createRouter=require('./create')
const userRouter=require('./user')
const reviewRouter=require('./review')
const searchRouter=require('./search')

router.use('/', createRouter)
router.use('/',userRouter)
router.use('/',reviewRouter)
router.use('/',searchRouter)

module.exports=router