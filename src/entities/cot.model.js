const {ASSETS} = require('./constant')

class COT {
    constructor(cotBuilder) {
        this.asset = cotBuilder.asset
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
        return parseFloat((this.poiLongPos - this.poiShortPos).toFixed(2))
    }
}

class CotBuilder {

    constructor(asset, date) {
        this.asset = asset
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

function cotFromRow(row) {

    const asset = ASSETS[row['Market_and_Exchange_Names']]
    const report_date = row["Report_Date_as_MM_DD_YYYY"].toISOString()
    const levLongPos = row["Lev_Money_Positions_Long_All"]
    const levShortPos = row["Lev_Money_Positions_Short_All"]
    const changeLongPos = row["Change_in_Lev_Money_Long_All"]
    const changeShortPos = row["Change_in_Lev_Money_Short_All"]
    const percentOILong = row["Pct_of_OI_Lev_Money_Long_All"]
    const percentOIShort = row["Pct_of_OI_Lev_Money_Short_All"]

    return new CotBuilder(asset, report_date)
        .levMoneyLong(levLongPos)
        .levMoneyShort(levShortPos)
        .changeLongPos(changeLongPos)
        .changeShortPos(changeShortPos)
        .percentOILong(percentOILong)
        .percentOIShort(percentOIShort)
        .build()

}


module.exports = {CotBuilder, cotFromRow}