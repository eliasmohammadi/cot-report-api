const importService = require('../services/import.service')
const assetService = require('../services/assets.service')

async function getAssets(req, res) {

    try {
        const {asset, start_date: startDate, end_date: endDate, skip, limit} = req.query

        const result = await assetService.getAssets(startDate, endDate, asset, {
            skip: parseInt(skip) || 0,
            limit: parseInt(limit) || 10
        })
        res.status(200).send({
            result: result
        })

    } catch (e) {
        res.status(500).send({message: e.message})
    }

}

async function getAssetsAggregation(req, res) {
    try {

        const {pos, agg, start_date: startDate, end_date: endDate, asset} = req.query
        const result = await assetService.getAssetsAggregation(pos, agg, startDate, endDate, asset)
        res.status(200).send({
            result: result
        })

    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

async function importAssets(req, res) {
    try {
        const zippedPathFile = req.file.path
        importService.importCotReport(zippedPathFile)
        res.status(200).send({
            result: {
                "imported": true
            }
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

async function syncAssets(req, res) {
    try {
        const dateReport = req.body.date
        importService.syncCotReport(dateReport)
        res.status(200).send({
            imported: true
        })
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

module.exports = {
    getAssets,
    getAssetsAggregation,
    importAssets,
    syncAssets
}