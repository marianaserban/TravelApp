const sequelize=require('../models/index.js')
const express=require('express')
const router=express.Router()

router.get('/create', async (req, res, next) => {
    try {
      // console.log(sequelize);
      await sequelize.sequelize.sync({ force: true })     // force: true => forteaza sa se stearga tabela
      res.status(201).json({ message: 'created' })
    } catch (err) {
      next(err)
    }
})

module.exports=router
