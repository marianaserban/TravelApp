const sequelize=require('../models/index.js')
const express=require('express')
const router=express.Router()


//aducem datele despre un user
router.get('/profile/:id',(req,res)=>{

})

//update profil -> fara update parola pentru ca e o ruta diferita
router.put('/profile/:id',(req,res)=>{

})

//dezactivare cont
router.delete('/profile/:id',(req,res)=>{

})

module.exports=router
