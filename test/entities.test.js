const {describe, it} = require('mocha')
const {expect} = require('chai')
const {CotBuilder} = require('../src/entities/cot.model')

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

        expect(JSON.stringify(actual)).equal(JSON.stringify(expected))
        done()
    })
})