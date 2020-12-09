const express=require('express')
const { route } = require('./create')
const router = express.Router()
const createRouter=require('./create')

router.use('/', createRouter)


module.exports=router