const {Transform, Writable} = require('stream')
const {cotFromRow} = require('../entities/cot.model')

class AssetsTransform extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    _transform(cotRow, encoding, callback) {
        const cotObj = cotFromRow(cotRow)
        this.push(cotObj)
        callback()
    }

    _flush(callback) {
        callback()
    }
}

class MongoWriterStream extends Writable {

    constructor(repoInstance, options = {}) {
        super({objectMode: true});
        this.repo = repoInstance
        this.records = []
        this.options = options
    }

    _insertMany() {
        if (this.records.length !== 0) {
            this.repo.insertMany(this.records)
        }
    }


    _write(record, encoding, callback) {
        try {
            const batchSize = this.options.batchSize || 25
            this.records.push(record)
            if (this.records.length > batchSize) {

                this._insertMany()
                this.records = []
            }
            callback()
        } catch (e) {
            callback(e)
        }
    }

    _final(callback) {
        if (this.records.length > 0) {
            this._insertMany()
        }
    }
}

module.exports = {
    AssetsTransform,
    MongoWriterStream
}