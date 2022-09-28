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

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required.'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required.'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Latitude is not valid.'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Longitude is not valid.'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required.'),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Price per day is required and must be a number.'),
    handleValidationErrors
];

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

//create review for Spot
router.post('/:id/reviews', validateReview, requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    const userId = req.user.id
    const { review, stars } = req.body
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        const oldReview = await Review.findAll({
            where: {
                [Op.and]: [
                    { spotId: spot.id },
                    { userId: userId }
                ]
            }
        });
        if (oldReview.length) {
            res.status(403)
            res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        } else {
            let newReview = await Review.create({
                userId,
                spotId: spot.id,
                review,
                stars
            })
            res.status(201)
            res.json(newReview)
        }

    }
})

//Get all Review by Spot's ID
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params
    const currentSpot = await Spot.findByPk(spotId)
    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', "firstName", "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    })
    if (!currentSpot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json({ Reviews: allReviews })
})


//get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    let userSpots = {}
    userSpots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        raw: true
    })
    for (const spot of userSpots) {
        const avg = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw: true
        })
        spot.avgRating = (Number(avg[0].average))
    }
    for (const spot of userSpots) {
        const image = await SpotImage.findAll({
            where: { spotId: spot.id, preview: true },
            attributes: ['url'],
            raw: true
        })
        spot.previewImage = image[0].url
    }
    res.json(userSpots)
})

//get spot by spotId
router.get('/:id', async (req, res) => {
    const spot = await Spot.findByPk(req.params.id, {
        include: [{
            model: SpotImage,
            attributes: ["id", "url", "preview"]
        },
        { model: User, attributes: ["id", "firstName", "lastName"], as: "Owner" }]
    })
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        const reviewData = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'numReviews']],
            raw: true
        });
        spot.dataValues.numReviews = reviewData[0].numReviews;
        spot.dataValues.avgStarRating = reviewData[0].avgRating;
        res.json(spot)
    }
})
//get all spots
router.get('/', async (req, res, next) => {
    let allSpots = []
    const spots = await Spot.findAll()

    for (const spot of spots) {
        const avg = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw: true
        })
        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                [Op.or]: [{ preview: true }, { preview: false }]
            },
            attributes: ['url'],
            raw: true
        })

        let allSpot = spot.toJSON()
        allSpot.avgRating = (Number(avg[0].average))
        allSpot.previewImage = image.url
        allSpots.push(allSpot)
    }
    res.json({ Spots: allSpots })
})


//Create Spot
router.post('/', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201)
    return res.json(newSpot)

})

//add an img to spot based on spot's ID
router.post('/:id/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    const userId = req.user.id
    const { url, preview } = req.body

    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const newImg = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })

    const ele = await SpotImage.findByPk(newImg.id)
    res.json(ele)
}),

    //edit spot
    router.put('/:id', validateSpot, requireAuth, async (req, res, next) => {
        const updatedSpot = await Spot.findByPk(req.params.id)
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        if (!updatedSpot) {
            res.status(404)
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        } else {
            updatedSpot.set({
                address, city, state, country, lat, lng, name, description, price
            })
            await updatedSpot.save()
            res.json(updatedSpot)
        }
    })

// create booking from spot based on SpotId
router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { startDate, endDate } = req.body // startdate/enddate is a string
    const currentSpot = await Spot.findByPk(req.params.spotId)
    if(!currentSpot){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
        const currentBooking = await Booking.findAll({
            where: {
                spotId: currentSpot.id
            }
        })
        const currentEndDate = new Date(endDate).getTime() //converts enddate/startdate to date object and getTIme converts to seconds
        const currentStartDate = new Date(startDate).getTime()
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
    // else if(currentSpot.ownerId === req.user.id) {
    //     res.status(403)
    //     res.json({
    //         "message": "Sorry, this spot is already booked for the specified dates",
    //         "statusCode": 403,
    //         "errors": {
    //           "startDate": "Start date conflicts with an existing booking",
    //           "endDate": "End date conflicts with an existing booking"
    //         }
    //       })
    // }
    for (const specificBooking of currentBooking) {  //specficbooking.startDate/endDate is a string
       const oldStartDate = new Date(specificBooking.startDate).getTime() // converts to date object in seconds.
        const oldEndDate = new Date(specificBooking.endDate).getTime()
        if((oldStartDate >= currentStartDate && oldEndDate <= currentEndDate) || (oldStartDate <= currentStartDate && oldEndDate >= currentEndDate)) {
            // if booking exists return error
            res.status(403)
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
              })
        }
    }
    const newBooking = await Booking.create({
        spotId: currentSpot.id,
        userId: req.user.id,
        startDate,
        endDate
    })
    return res.json(newBooking)
})

// delete
router.delete('/:id', requireAuth, async (req, res, next) => {
    const deletedSpot = await Spot.findByPk(req.params.id)
    if (!deletedSpot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    await deletedSpot.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})














module.exports = router;
