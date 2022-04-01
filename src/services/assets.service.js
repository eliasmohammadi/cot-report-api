const repoManager = require('../repositories/repository.manager')
const {SPECIFIC_KEYWORD} = require("../entities/constant")

async function getAssets(startDate, endDate, assetName, options = {}) {


    return repoManager.assetRepo().filterAsset(startDate, endDate, assetName, options)

}


async function getAssetsAggregation(pos, agg, startDate, endDate, asset = "") {

    let result
    if (pos === SPECIFIC_KEYWORD.LONG) {
        result = await repoManager.assetRepo().getLongPosInfo(startDate, endDate, asset, agg)
    } else if (pos === SPECIFIC_KEYWORD.SHORT) {
        result = await repoManager.assetRepo().getShortPosInfo(startDate, endDate, asset, agg)
    }

    return result
}

async function getLastWeekTop() {
    const startWeek = "2022-03-15T00:00:00.000Z"
    const endWeek = "2022-03-22T00:00:00.000Z"
    let data = await Promise.all([
            repoManager.assetRepo().getTopAssets(startWeek, endWeek, "levLongPos", SPECIFIC_KEYWORD.MAX, 1,{
                asset:1,
                levLongPos:1
            }),
            repoManager.assetRepo().getTopAssets(startWeek, endWeek, "levShortPos", SPECIFIC_KEYWORD.MAX, 1,{
                asset:1,
                levShortPos:1,
            }),
            repoManager.assetRepo().getTopAssets(startWeek, endWeek, "changeLongPos", SPECIFIC_KEYWORD.MAX, 1,{
                asset:1,
                changeLongPos:1
            }),
            repoManager.assetRepo().getTopAssets(startWeek, endWeek, "changeShortPos", SPECIFIC_KEYWORD.MAX, 1,{
                asset:1,
                changeShortPos:1
            })
        ]
    )

    data = data.map(d => {
        return d[0]
    })

    return {
        topLongPos: data[0],
        topShortPos: data[1],
        topChangeLongPos: data[2],
        topChangeShortPos: data[3]
    }

}

module.exports = {
    getAssets,
    getAssetsAggregation,
    getLastWeekTop
}

