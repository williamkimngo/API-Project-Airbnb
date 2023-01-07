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

//delete booking

router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const currentBooking = await Booking.findByPk(req.params.bookingId)
    const oldDate = new Date()
    if(!currentBooking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    } else if((currentBooking.startDate <= oldDate) && currentBooking.endDate >= oldDate){
        res.status(403)
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    } else {
        await currentBooking.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})
//get all booking of current user

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

    // for (const booking of currentBooking) {
    //     const img = await SpotImage.findOne({
    //         where: {
    //             spotId: booking.spotId,
    //             preview: true
    //         },
    //         attributes: ['url'],
    //         raw: true
    //     })
    //     let currentImg = booking.toJSON()
    //     currentImg.Spot.previewImage = img.url
    //     userBooking.push(currentImg)
    // }
    res.json({Bookings: currentBooking})

})

//edit a booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
    const { startDate, endDate } = req.body
    const currentEndDate = new Date(endDate).getTime()
    const currentStartDate = new Date(startDate).getTime()

    const currentBooking = await Booking.findByPk(req.params.bookingId) //return object
    console.log(currentBooking)
    if (!currentBooking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    console.log(currentEndDate)
    console.log(currentStartDate)
    if((currentEndDate <= currentStartDate)){
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
        }
            const oldStartDate = new Date(currentBooking.startDate).getTime() // converts to date object in seconds.
             const oldEndDate = new Date(currentBooking.endDate).getTime()
             if((oldStartDate >= currentStartDate && oldEndDate <= currentEndDate) || (oldStartDate <= currentStartDate && oldEndDate >= currentEndDate)) {
                 // if booking exists return error
                 res.status(403)
                 res.json({
                     "message": "Sorry, this spot is already booked for the specified dates",
                     "statusCode": 403,
                     "errors": {
                       "startDate": "Start date conflicts with an existing booking",
                       "endDate": "End date conflicts with an existing booking",
                     }
                   })
             }
         currentBooking.currentStartDate = startDate
         currentBooking.currentEndDate = endDate
         await currentBooking.update()
         res.json(currentBooking)
})
























module.exports = router;
