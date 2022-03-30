const {SPECIFIC_KEYWORD} = require("../entities/constant")
const {_} = require('lodash')

class AssetRepository {
    constructor(collection) {
        this.collection = collection
    }

    async insertMany(assets) {
        try {
            await this.collection.insertMany(assets)
        } catch (e) {
            if (e.code === 11000){

            }

        }
    }

    getByAssetName(assetName, options = {}) {
        const mongoFindQuery = this.collection.find({asset: assetName})
        if (options.limit)
            mongoFindQuery.limit(options.limit)
        if (options.skip)
            mongoFindQuery.skip(options.skip)
        return mongoFindQuery.toArray()
    }

    getByDateRange(startDate = "", endDate = "", options = {}) {
        const query = {}
        if (startDate) {
            query.date = {}
            query.date.$gte = startDate
        }
        if (endDate)
            query.date.$lte = endDate

        const mongoFindQuery = this.collection.find(query)

        if (options.limit)
            mongoFindQuery.limit(options.limit)
        if (options.skip)
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
            query.date.$lte = endDate
        if (asset) {
            query.asset = asset
        }
        const mongoFindQuery = this.collection.find(query)

        if (options.limit)
            mongoFindQuery.limit(options.limit)
        if (options.skip)
            mongoFindQuery.skip(options.skip)

        return mongoFindQuery.toArray()
    }

    getLongPosInfo(startDate = "", endDate = "", asset = "", criteria) {

        const matchQuery = {
            $match: {}
        }
        const groupPipe = {
            $group: {
                _id: "$asset",
                // hit: {
                //     "$first": "$$ROOT"
                // }
                maxLongPos: {
                    "$max": "$levLongPos"
                },
                minLongPos: {
                    "$min": "$levLongPos"
                }
            }
        }


        if (criteria === SPECIFIC_KEYWORD.MAX)
            groupPipe.$group = _.omit(groupPipe.$group, ['minLongPos'])
        else if (criteria === SPECIFIC_KEYWORD.MIN)
            groupPipe.$group = _.omit(groupPipe.$group, ['maxLongPos'])

        if (startDate)
            matchQuery.$match.date = {"$gte": startDate}
        if (endDate)
            matchQuery.$match.date["$lte"] = endDate
        if (asset) {
            matchQuery.$match.asset = asset
            groupPipe.$group._id = "$asset"
        }


        const pipeline = [
            matchQuery,
            groupPipe
        ]

        return this.collection.aggregate(pipeline).toArray()

    }

    getShortPosInfo(startDate = "", endDate = "", asset = "", criteria) {

        const matchQuery = {
            $match: {}
        }
        const groupPipe = {
            $group: {
                _id: "$asset",
                maxShortPos: {
                    "$max": "$levShortPos"
                },
                minShortPos: {
                    "$min": "$levShortPos"
                }
            }
        }


        if (criteria === SPECIFIC_KEYWORD.MAX)
            groupPipe.$group = _.omit(groupPipe.$group, ['minShortPos'])
        else if (criteria === SPECIFIC_KEYWORD.MIN)
            groupPipe.$group = _.omit(groupPipe.$group, ['maxShortPos'])

        if (startDate)
            matchQuery.$match.date = {"$gte": startDate}
        if (endDate)
            matchQuery.$match.date["$lte"] = endDate
        if (asset) {
            matchQuery.$match.asset = asset
            groupPipe.$group._id = "$asset"
        }


        const pipeline = [
            matchQuery,
            groupPipe
        ]

        return this.collection.aggregate(pipeline).toArray()

    }
}


module.exports = {
    AssetRepository
}