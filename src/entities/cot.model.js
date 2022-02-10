class COT {
    constructor(cotBuilder) {
        this.currency = cotBuilder.currency
        this.date = cotBuilder.date
        this.levLongPos = cotBuilder.longPos
        this.levShortPos = cotBuilder.shortPos
        this.changeLongPos = cotBuilder.changeLong
        this.changeShortPos = cotBuilder.changeShort
        this.poiLongPos = cotBuilder.poiLong
        this.poiShortPos = cotBuilder.poiShort
        this.flip = this.calcFlip()
    }

    calcFlip() {
        return this.poiLongPos - this.poiShortPos
    }
}

class CotBuilder {

    constructor(currency, date) {
        this.currency = currency
        this.date = date
    }

    levMoneyLong(longPos) {
        this.longPos = longPos
        return this
    }

    levMoneyShort(shortPos) {
        this.shortPos = shortPos
        return this
    }

    changeLongPos(change) {
        this.changeLong = change
        return this
    }

    changeShortPos(change) {
        this.changeShort = change
        return this
    }

    percentOILong(poiLong) {
        this.poiLong = poiLong
        return this
    }

    percentOIShort(poiShort) {
        this.poiShort = poiShort
        return this
    }

    build() {
        return new COT(this)
    }
}

module.exports = {CotBuilder}