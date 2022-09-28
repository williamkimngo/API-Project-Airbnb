const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const user = require('../../db/models/user');
const spot = require('../../db/models/spot');
const router = express.Router();



const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ gt: 0, lt: 6 })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
];

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const currentReview = await Review.findByPk(req.params.id)
    const { url } = req.body

    if (!currentReview) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else {
        const oldImg = await ReviewImage.findAll({
            where: {
                reviewId: currentReview.id
            }
        })
        if (oldImg.length === 10) {
            res.status(403)
            res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
        } else {
            let newImg = await ReviewImage.create({
                reviewId: currentReview.id,
                url
            })
            res.json({
                id: newImg.id,
                url: newImg.url
            })
        }
    }
})




router.get('/current', requireAuth, async (req, res, next) => {
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
            where: { spotId: dataSpot.id },
            attributes: ['url'],
            raw: true
        },
        )


    }
    res.json(reviewUser)
})
























module.exports = router;
