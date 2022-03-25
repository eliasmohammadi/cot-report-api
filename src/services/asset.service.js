const repoManager = require('../repositories/repository.manager')

async function getAssets(startDate, endDate, assetName, options = {}) {



    return repoManager.assetRepo().filterAsset(startDate, endDate, assetName, options)

}

module.exports = {
    getAssets
}

