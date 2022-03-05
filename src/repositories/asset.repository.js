class AssetRepository {
    constructor(collection) {
        this.collection = collection
    }

    insertMany(assets) {
        return this.collection.insertMany(assets)
    }


    getAssetBy(startDate = "", endDate = "", asset = "", options = {}) {
        const query = {}
        if (startDate) {
            query.date = {}
            query.date.$gte = startDate
        }
        if (endDate)
            query.date.$lte =  endDate
        if (asset) {
            query.asset = asset
        }

        return this.collection.find(query, options).toArray()
    }

    getMaxLongPos(startDate = "", endDate = "", asset = "", options = {}) {

        const matchQuery = {}

        const groupPipe = {
            _id: null,
            maxLogPos: {
                "$max": "$levLongPos"
            },
            hit: {
                "$first": "$$ROOT"
            }
        }
        if (startDate)
            matchQuery.date = {"$gte": startDate}
        if (endDate)
            matchQuery.date.append("$lte", endDate)
        if (asset) {
            matchQuery.asset = asset
            groupPipe._id = "$asset"
        }


        const pipeline = [
            matchQuery,
            groupPipe
        ]


        return this.collection.aggregate(pipeline)

    }


}


module.exports = {
    AssetRepository
}