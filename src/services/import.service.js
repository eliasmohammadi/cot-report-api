const axios = require('axios')
const config = require("../configs/app.config")
const {getDownloadableFileName, unzip} = require('../libs/utils')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const {AssetsTransform, MongoWriterStream, FilterStream} = require('../libs/helper.stream')
const repoManager = require('../repositories/repository.manager')
const {ASSETS} = require('../entities/constant')

async function downloadCotReport() {
    const endpoint = `${config.COT_REPORT_BASE_ENDPOINT}${getDownloadableFileName(new Date())}`
    return axios.get(endpoint, {
        responseType: "stream"
    })

}

async function importCotReport() {
    /** download and write*/

    const downloadReader = await downloadCotReport()
    const fileName = path.join(config.FILE_PATH_DIR, config.COT_ZIP_NAME)
    const writer = fs.createWriteStream(fileName)
    downloadReader.data.pipe(writer)

    /**unzip*/
    const filePath = path.join(config.FILE_PATH_DIR, config.COT_ZIP_NAME)
    const unzippedFile = await unzip(filePath, config.FILE_PATH_DIR)
    const file = path.join(config.FILE_PATH_DIR, unzippedFile.entry[0])

    /** read xls file in json format as stream */
    const workbook = xlsx.readFile(file, {cellDates: true})
    const xlsReaderStream = xlsx.stream.to_json(workbook.Sheets.XLS, {})

    /** transform xls row into cot object with stream pipeline.
     *  insert cot object to  database
     */

    xlsReaderStream
        .pipe(new FilterStream(function (cotRow) {
            return ASSETS[cotRow['Market_and_Exchange_Names']] !== undefined
        }))
        .pipe(new AssetsTransform())
        .pipe(new MongoWriterStream(repoManager.assetRepo(), {batchSize: 30}))

}

module.exports = {
    downloadCotReport,
    importCotReport
}