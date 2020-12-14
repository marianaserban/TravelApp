const sequelize=require('../models/index.js')
const express=require('express')
const router=express.Router()

//adauga review
router.post('/user/:pid/review',(req,res)=>{

})

//modificare un anumit review
router.put('/user/:pid/review/:rid',(req,res)=>{

})

//stergere un anumit review
router.delete('/user/:pid/review/:rid',(req,res)=>{

})
//listarea tuturor
router.get('/user/:pid/reviews',(req,res)=>{

})

module.exports=router
