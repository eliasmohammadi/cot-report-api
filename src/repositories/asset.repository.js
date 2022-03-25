class AssetRepository {
    constructor(collection) {
        this.collection = collection
    }

    insertMany(assets) {
        return this.collection.insertMany(assets)
    }

    getByAssetName(assetName,options={}){
        const mongoFindQuery = this.collection.find({asset:assetName})
        if(options.limit)
            mongoFindQuery.limit(options.limit)
        if(options.skip)
            mongoFindQuery.skip(options.skip)
        return mongoFindQuery.toArray()
    }

    getByDateRange(startDate="",endDate="",options={}) {
        const query = {}
        if (startDate) {
            query.date = {}
            query.date.$gte = startDate
        }
        if (endDate)
            query.date.$lte =  endDate

        const mongoFindQuery = this.collection.find(query)

        if(options.limit)
            mongoFindQuery.limit(options.limit)
        if(options.skip)
            mongoFindQuery.skip(options.skip)

        return mongoFindQuery.toArray()
    }
    filterAsset(startDate = "", endDate = "", asset = "", options = {}) {
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
        const mongoFindQuery = this.collection.find(query)

        if(options.limit)
            mongoFindQuery.limit(options.limit)
        if(options.skip)
            mongoFindQuery.skip(options.skip)

        return mongoFindQuery.toArray()
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