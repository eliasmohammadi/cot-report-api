const express = require('express')
const router = express.Router()
const {getAssets,getAssetsAggregation,importAssets,syncAssets} = require('../controllers/assets.controller.js')
const {uploadMiddleware} = require('../configs/express.config')

router.route('/assets/').get(getAssets)
router.route('/assets/aggs').get(getAssetsAggregation)
router.route('/assets/import')
    .post(uploadMiddleware.single('cot-file')
        ,importAssets)
router.route('/assets/sync-data')
    .post(syncAssets)

module.exports = {
    assetRouter:router
}
