const repoManager = require('../repositories/repository.manager')
const {SPECIFIC_KEYWORD} = require("../entities/constant")

async function getAssets(startDate, endDate, assetName, options = {}) {


    return repoManager.assetRepo().filterAsset(startDate, endDate, assetName, options)

}


async function getAssetsAggregation(pos, agg, startDate, endDate, asset = "") {

    let result
    if (pos === SPECIFIC_KEYWORD.LONG) {
        result = await repoManager.assetRepo().getLongPosInfo(startDate,endDate,asset,agg)
    } else if (pos === SPECIFIC_KEYWORD.SHORT) {
        result = await repoManager.assetRepo().getShortPosInfo(startDate,endDate,asset,agg)
    }

    return result
}



module.exports = {
    getAssets,
    getAssetsAggregation
}

