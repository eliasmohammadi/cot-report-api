const express = require('express')
const router = express.Router()
const {getAssets,getAssetsAggregation,importAssets} = require('../controllers/assets.controller.js')
const {uploadMiddleware} = require('../configs/express.config')

router.route('/assets/').get(getAssets)
router.route('/assets/aggs').get(getAssetsAggregation)
router.route('/assets/import')
    .post(uploadMiddleware.single('cot-file')
        ,importAssets)


module.exports = {
    assetRouter:router
}
