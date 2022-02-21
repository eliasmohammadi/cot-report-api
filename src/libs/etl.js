const {Transform} = require('stream')
const {cotFromRow} = require('../entities/cot.model')

class AssetsTransform extends Transform {
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
    AssetsTransform
}