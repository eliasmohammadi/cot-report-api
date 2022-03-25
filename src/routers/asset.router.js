const express = require('express')
const router = express.Router()
const {getAssets,getAssetsAggregation} = require('../controllers/assets.controller.js')


router.route('/assets/').get(getAssets)
router.route('/assets/aggs').get(getAssetsAggregation)


module.exports = {
    assetRouter:router
}
