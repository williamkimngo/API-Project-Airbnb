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


//delete review image

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const currentImg = await ReviewImage.findByPk(req.params.imageId)
    if(!currentImg) {
        res.status(404)
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    } else {
        await currentImg.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})







module.exports = router;
