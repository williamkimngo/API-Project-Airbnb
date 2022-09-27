const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
const user = require('../../db/models/user');
const spot = require('../../db/models/spot');
const router = express.Router();


// get all spots, NOT DONE
// router.get('/', async (req, res, next) => {
//     const spots = await Spot.findAll({
//     })

//     let resBody = []
//     for (let i = 0; i < spots.length; i++) {
//         const avg = await Review.findAll({
//             where: {
//                 spotId: spots[i].id
//             },
//             attributes: [
//                 [sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']
//             ],
//             raw: true
//         })
//         const image = await SpotImage.findAll({
//             where: {
//                 spotId: spots[i].id
//             },
//             attributes: ['url'],
//             raw: true
//         })
//         console.log(i)
//         let {id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt} = spots[i]
//         resBody.push({
//             id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt,
//             avgRating: Number(avg[0].avgRating),
//             previewImage: image[0].url
//         })
//     }
//     res.json({
//         Spots: resBody
//     })
// })

//get all spots
router.get('/', async (req, res, next) => {
    let resBody = {}
    resBody.Spots = await Spot.findAll({
        raw: true
    })

    for (const spot of resBody.Spots) {
        const avg = await Review.findAll({
            where: { spotId: spot.id},
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw: true
        })
        spot.avgRating = (Number(avg[0].average))
    }
    for (const spot of resBody.Spots) {
        const image = await SpotImage.findAll({
            where: {spotId: spot.id, preview: true},
            attributes: ['url'],
            raw: true
        })
        spot.previewImage = image[0].url
    }
    res.json(resBody)
})
//get all spots owned by current user

router.get('/current', requireAuth, async(req, res, next) => {
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
            where: { spotId: spot.id},
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw: true
        })
        spot.avgRating = (Number(avg[0].average))
    }
    for (const spot of userSpots) {
        const image = await SpotImage.findAll({
            where: {spotId: spot.id, preview: true},
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
            attributes: ["spotId", "url", "preview"]
        },
         {model: User, attributes: ["id", "firstName", "lastName"], as: "Owner"}]
    })
    res.json(spot)
})

//Create Spot
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price} = req.body

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

    if(!spot) {
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

router.put('/:id', requireAuth, async(req, res, next) => {
    const updatedSpot = await Spot.findByPk(req.params.id)
    const {address, city, state, country, lat, lng, name, description, price} = req.body
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

router.delete('/:id', requireAuth, async(req, res, next) => {
    const deletedSpot = await Spot.findByPk(req.params.id)
    if(!deletedSpot){
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
