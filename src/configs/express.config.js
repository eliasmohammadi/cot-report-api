const express = require('express')
const cors = require('cors')
const multer = require('multer')

const config = require('./app.config')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())


const BASE_END_POINT = '/cot/api/v1'


const reportFileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(config.FILE_PATH_DIR))
    },
    filename: function (req, file, cb) {
        cb(null, config.COT_ZIP_NAME)
    }
})


const uploadMiddleware = multer({storage: reportFileStorage})


module.exports = {
    expressApplication: app,
    uploadMiddleware,
    BASE_END_POINT
}


