class AssetRepository {
    constructor(collection) {
        this.collection = collection
    }

    insertMany(assets) {
        return this.collection.insertMany(assets)
    }

}


module.exports = {
    AssetRepository
}