const {Transform} = require('stream')
const {cotFromRow} = require('../entities/cot.model')

class FilterAssetsTransform extends Transform {
    constructor() {
        super({
            objectMode:true,
        });
    }

    _transform(cotRow, encoding, callback) {
        const cotObj = cotFromRow(cotRow)
        this.push(JSON.stringify(cotObj))
        callback()
    }

    _flush(callback) {
        callback()
    }
}

module.exports = {
    FilterAssetsTransform
}