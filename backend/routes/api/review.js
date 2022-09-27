const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const user = require('../../db/models/user');
const spot = require('../../db/models/spot');
const router = express.Router();


router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id
    const reviewUser = {}
    reviewUser = await Review.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', "lastName"]
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
    ]
    })
    for (const rev of reviewUser) {
        const dataSpot = await rev.getSpot()
        const imgReview = await SpotImage.findAll({
            where: {spotId: dataSpot.id},
            attributes: ['url'],
            raw: true
        },
        )


    }
    res.json(reviewUser)
})
























module.exports = router;
