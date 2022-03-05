const express = require('express')
const router = express.Router()
const {getAssets} = require('../controllers/assets.controller.js')


router.route('/assets/').get(getAssets)


module.exports = {
    assetRouter:router
}
