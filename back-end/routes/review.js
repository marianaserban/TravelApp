const sequelize = require('../models/index.js')
const express = require('express')
const router = express.Router()


//adauga review
router.post('/user/:pid/review', async (req, res) => {
    try {
        const review = await models.Review.create(req.body)
        if (review)
            res.status(201).json({ message: 'created' })
        else
            res.status(400).json({ message: 'failed' })
    } catch (error) {
        //Trebuie facut catch la erori la final in server.js (prin middleware ca la seminar)
        next(error);
    }
})

//modificare un anumit review
router.put('/user/:pid/review/:rid', async (req, res) => {

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
        const review = await models.User.findByPk(id)
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
//listarea tuturor
router.get('/user/:pid/reviews', async (req, res) => {
    try {
        const reviews = await models.Review.findAll()
        res.status(200).json(reviews)
    } catch (error) {
        next(error);
    }
})


module.exports = router
