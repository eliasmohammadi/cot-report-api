const express = require('express')
const router = express.Router()
const {getAssets,getAssetsAggregation,importAssets,syncAssets,getLastWeekTop} = require('../controllers/assets.controller.js')
const {uploadMiddleware} = require('../configs/express.config')

router.route('/assets/').get(getAssets)
router.route('/assets/aggs').get(getAssetsAggregation)
router.route('/assets/import')
    .post(uploadMiddleware.single('cot-file')
        ,importAssets)
router.route('/assets/sync-data')
    .post(syncAssets)

router.route('/assets/last-week-top')
    .get(getLastWeekTop)

module.exports = {
    assetRouter:router
}
