const assetService = require('../services/asset.service')

async function getAssets(req, res) {

    try {
        const {asset, start_date:startDate, end_date:endDate} = req.query

        const result = await assetService.getAssets(startDate, endDate, asset)
        res.status(200).send({
            result: result
        })

    } catch (e) {
        res.status(500).send({message: e.message})
    }

}


module.exports = {
    getAssets
}