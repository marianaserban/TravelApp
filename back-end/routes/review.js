const sequelize = require('../models/index.js')
const express = require('express')
const router = express.Router()
const models=require('../models')
const User=require('../models').User

//adauga review
router.post('/user/:pid/review', async (req, res,next) => {
    try {

        const { origin, destination, meanOfTransport, departureHour,
            tripDuration,crowdedness,observations,satisfactionLevel} = req.body;
        let errors = [];
      
        if (!origin || !destination || !meanOfTransport || !departureHour || !tripDuration || !crowdedness || !observations || !satisfactionLevel) {
          errors.push({ msg: 'Please enter all fields' });
          res.status(400).send({ message: 'Please enter all fields' })
        }

        const person = await User.findByPk(req.params.pid)
       if(person){

        console.log(person.id)
        const review = await models.Review.create({...req.body, userId: person.id})
        
        if (review)
            res.status(201).json({ message: 'created' })
        else
            res.status(400).json({ message: 'failed' })
       }
    } catch (error) {
  
        res.status(500).send({message:'fill in the fields properly'})
    }
})

//modificare un anumit review
router.put('/user/:pid/review/:rid', async (req, res) => {

    const { origin, destination, meanOfTransport, departureHour,
        tripDuration,crowdedness,observations,satisfactionLevel} = req.body;
    let errors = [];
  
    if (!origin || !destination || !meanOfTransport || !departureHour || !tripDuration || !crowdedness || !observations || !satisfactionLevel) {
      errors.push({ msg: 'Please enter all fields' });
      res.status(400).send({ message: 'Please enter all fields' })
    }
    try {
        const id = req.params.rid;
        const review = await models.Review.findByPk(id)
        if (review) {
            await review.update(req.body);
            res.status(202).json({ message: "accepted" });
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (error) {
        next(error);
    }

})

//stergere un anumit review
router.delete('/user/:pid/review/:rid', async (req, res) => {
    try {
        const id = req.params.rid;
        const review = await models.Review.findByPk(id)
        if (review) {
            await review.destroy();
            res.status(200).json({ message: "deleted" });
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (error) {
        next(error);
    }
})
//listarea tuturor pt un singur user
router.get('/user/:pid/reviews', async (req, res) => {
    try {
        const person = await User.findByPk(req.params.pid, {
            include: [ models.Review ]
          })
          if (person) {
            res.status(200).json(person.reviews)
          } else {
            res.status(404).json({ message: 'not found' })
          }
  
    } catch (error) {
        next(error);
    }
})

//listarea tuturor
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await models.Review.findAll()
        res.status(200).json(reviews)
    } catch (error) {
        next(error);
    }
})


module.exports = router
