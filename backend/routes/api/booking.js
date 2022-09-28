const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const user = require('../../db/models/user');
const spot = require('../../db/models/spot');
const { Op } = require('sequelize');
const router = express.Router();




router.get('/current', requireAuth, async(req, res, next) => {
    let userBooking = []
    const currentBooking = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ["description", "createdAt", "updatedAt"]
            }
        }
    })

    for (const booking of currentBooking) {
        const img = await SpotImage.findOne({
            where: {
                spotId: booking.spotId,
                preview: true
            },
            attributes: ['url'],
            raw: true
        })
        let currentImg = booking.toJSON()
        currentImg.Spot.previewImage = img.url
        userBooking.push(currentImg)
    }
    res.json({Bookings: userBooking})

})


























module.exports = router;
