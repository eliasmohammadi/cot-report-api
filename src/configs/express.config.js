const express = require('express')
const cors = require('cors')

const {assetRouter} = require('../routers/asset.router')


const app = express()
app.use(express.json())
app.use(cors())


const BASE_END_POINT = '/cot/api/v1'

app.use(BASE_END_POINT, assetRouter)

module.exports = {
    expressApplication:app
}


