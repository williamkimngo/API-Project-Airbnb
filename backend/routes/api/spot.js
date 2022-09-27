const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');
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



// router.post('/', async (req, res, next) => {
//     const { address, city, state, country, lat, lng, name, description, price} = req.body
//     const newSpot = await Spot.create({
//         ownerId: req.params.id,
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price
//     })
//     return res.json(newSpot)
// })




















module.exports = router;
