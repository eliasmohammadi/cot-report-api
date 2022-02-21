const {AssetRepository} = require('./asset.repository')

class RepositoryManager {
    setDb(database) {
        this.db = database
    }

    assetRepo() {
        return new AssetRepository(this.db.collection('assets'))
    }

}

/**only one instance*/
module.exports = new RepositoryManager()