const {describe, it} = require('mocha')
const {expect} = require('chai')
const {CotBuilder,cotFromRow} = require('../src/entities/cot.model')

describe('COT Construction', () => {

    it('should create a cot model with cot builder', (done) => {

        const expected = {
            asset: 'usd',
            date: '2021-01-01T00:00:00.000Z',
            levLongPos: 14213,
            levShortPos: 71056,
            changeLongPos: -217,
            changeShortPos: -779,
            poiLongPos: 11.6,
            poiShortPos: 58.2,
            flip: -46.6
        }
        const actual = new CotBuilder('usd', "2021-01-01T00:00:00.000Z")
            .levMoneyLong(14213)
            .levMoneyShort(71056)
            .changeLongPos(-217)
            .changeShortPos(-779)
            .percentOILong(11.6)
            .percentOIShort(58.2)
            .build()

        expect(actual).to.be.deep.equal(expected)
        done()
    })
})



describe("Work With Excel and Zip File", () => {

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

        expect(actual).to.be.an('object')
        expect(actual.asset).eq(expected.asset)
        expect(actual.date).eq(expected.date)
        expect(actual.levLongPos).eq(expected.levLongPos)
        expect(actual.levShortPos).eq(expected.levShortPos)
        expect(actual.changeLongPos).eq(expected.changeLongPos)
        expect(actual.changeShortPos).eq(expected.changeShortPos)
        expect(actual.poiLongPos).eq(expected.poiLongPos)
        expect(actual.poiShortPos).eq(expected.poiShortPos)
        expect(actual.flip).eq(expected.flip)

        done()
    })

})