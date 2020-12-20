const sequelize=require('../models/index.js')
const express=require('express')
const router=express.Router()
const models = require('../models')


//aducem datele despre un user
router.get('/profile/:id', async (req,res, next)=>{
    try {
        const profile = await models.User.findByPk(req.params.id)
        if (profile) {
            res.status(200).json(profile)
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (error) {
        next(error);
    }
})

//update profil -> fara update parola pentru ca e o ruta diferita
router.put('/profile/:id', async (req,res, next)=>{
    try {
        const profile = await models.User.findByPk(req.params.id)
        if (profile) {
            if (req.body.password) {
                delete req.body.password;
            }

            await profile.update(req.body);
            res.status(202).json({ message: "profile updated" });
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (error) {
        next(error);
    }
})

//dezactivare cont
router.delete('/profile/:id', async(req,res,next)=>{
    try {
        const profile = await models.User.findByPk(req.params.id)
        if (profile) {
            await profile.destroy();
            res.status(200).json({ message: "deleted" });
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (error) {
        next(error);
    }
})

module.exports=router
