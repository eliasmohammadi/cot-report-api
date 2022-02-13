const {describe, it} = require('mocha')
const chai = require('chai')
const {CotBuilder,cotFromRow} = require('../src/entities/cot.model')


describe("Work With Excel File", () => {

    it("should convert a excel row to cot model", (done) => {
        const row = {
            "Market_and_Exchange_Names": "CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE",
            "Report_Date_as_MM_DD_YYYY": new Date("2021-12-20T20:30:00.000Z"),
            "Lev_Money_Positions_Long_All": 16325,
            "Lev_Money_Positions_Short_All": 43932,
            "Change_in_Lev_Money_Long_All": -11367,
            "Change_in_Lev_Money_Short_All": 912,
            "Pct_of_OI_Lev_Money_Long_All": 11.2,
            "Pct_of_OI_Lev_Money_Short_All": 30.2,
        }

        const expected = new CotBuilder("cad","2021-12-20T20:30:00.000Z")
            .levMoneyLong(16325)
            .levMoneyShort(43932)
            .changeLongPos(-11367)
            .changeShortPos(912)
            .percentOILong(11.2)
            .percentOIShort(30.2)
            .build()

        const actual = cotFromRow(row)

        chai.expect(actual).to.be.an('object')
        chai.expect(actual.asset).eq(expected.asset)
        chai.expect(actual.date).eq(expected.date)
        chai.expect(actual.levLongPos).eq(expected.levLongPos)
        chai.expect(actual.levShortPos).eq(expected.levShortPos)
        chai.expect(actual.changeLongPos).eq(expected.changeLongPos)
        chai.expect(actual.changeShortPos).eq(expected.changeShortPos)
        chai.expect(actual.poiLongPos).eq(expected.poiLongPos)
        chai.expect(actual.poiShortPos).eq(expected.poiShortPos)
        chai.expect(actual.flip).eq(expected.flip)

        done()
    })
})