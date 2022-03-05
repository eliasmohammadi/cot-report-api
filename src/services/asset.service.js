const repoManager = require('../repositories/repository.manager')

async function getAssets(startDate, endDate, assetName, options = {}) {
    const result = await repoManager.assetRepo().getAssetBy(startDate, endDate, assetName, options)

    return result
}

module.exports = {
    getAssets
}

