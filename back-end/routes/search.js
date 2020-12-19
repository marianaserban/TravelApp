const sequelize=require('../models/index.js')
const express=require('express')
const router=express.Router()
const models=require('../models')

//rutele dupa filtrare
router.get('/reviews/origin', async (req,res) => {
    const query = {
        where: {}
    };

    try {
        console.log(req.query.filter)

        if (req.query.filter) {
            query.where.origin = req.query.filter;
            const reviewsByOrigin = await models.Review.findAll(query);

            console.log('/review/origin query OK');
            res.status(200).json(reviewsByOrigin);
        } else {
            //nu am primit filtru, returnez lista goala
            console.log('/review/origin query OK-ish (fara filtru)');
            res.status(200).json([]);
        }
    } catch (error) {
        //daca am eroare la findAll, intorc zero rezultate,
        //nu vreau sa stie userul ca nu s-a putut cauta in db
        //deci returnez o lista goala (array)
        console.log('/review/origin query ERR');
        res.status(200).json([]);
    }
})
router.get('/reviews/mean', async (req,res) => {
    const query = {
        where: {}
    };

    try {
        const filter = req.query.filter ? req.query.filter.toUpperCase() : '';

        //verific daca filtrul e unul din valorile acceptate
        const availableTransports = ['METRO', 'BUS', 'TRAM'];
        const isFilterValid = availableTransports.includes(req.query.filter.toUpperCase());

        if (isFilterValid) {
            //in punctul asta, totul e ok, deci fac query la db sa iau reviewurile cu filtru dat
            query.where.mean_of_transport = req.query.filter.toUpperCase();
            const reviewsByMean = await models.Review.findAll(query);
            
            console.log('/review/mean query OK');
            res.status(200).json(reviewsByMean);
        } else {
            throw ({ message: 'Unknown mean of transport'});
        }
    } catch (error) {
        //daca am eroare la findAll, intorc zero rezultate,
        //nu vreau sa stie userul ca nu s-a putut cauta in db
        //deci returnez o lista goala (array)
        console.log('/review/mean query ERR');
        res.status(200).json([]);
    }
})
router.get('/reviews/destination', async (req,res) => {
    const query = {
        where: {}
    };

    try {
        if (req.query.filter) {
            query.where.destination = req.query.filter;
            const reviewsByDestination = await models.Review.findAll(query);

            console.log('/review/destination query OK');
            res.status(200).json(reviewsByDestination);
        } else {
            //nu am primit filtru, returnez lista goala
            console.log('/review/destination query OK-ish (fara filtru)');
            res.status(200).json([]);
        }
    } catch (error) {
        //daca am eroare la findAll, intorc zero rezultate,
        //nu vreau sa stie userul ca nu s-a putut cauta in db
        //deci returnez o lista goala (array)
        console.log('/review/destination query ERR');
        res.status(200).json([]);
    }
})

module.exports=router
