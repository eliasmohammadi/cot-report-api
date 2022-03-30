const axios = require('axios')
const config = require("../configs/app.config")
const {getDownloadableFileName, unzip,removeEntireFile} = require('../libs/utils')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const {AssetsTransform, MongoWriterStream, FilterStream} = require('../libs/helper.stream')
const repoManager = require('../repositories/repository.manager')
const {ASSETS} = require('../entities/constant')

const {pipeline} = require('stream')
const {promisify} = require('util')

async function downloadCotReport(date) {
    const endpoint = `${config.COT_REPORT_BASE_ENDPOINT}${getDownloadableFileName(date)}`
    return axios.get(endpoint, {
        responseType: "stream"
    })

}


async function writeCotReport(readable) {


    const fileName = path.join(config.FILE_PATH_DIR, config.COT_ZIP_NAME)
    const writer = fs.createWriteStream(fileName)
    return new Promise(((resolve, reject) => {
        readable.data.pipe(writer).on('error', (err) => {
            reject({
                completed: false,
                error: err.message
            })
        }).on('close', () => {
            resolve({
                completed: true,
                error: ""
            })
        })
    }))
}

/**unzip*/
async function unzipCotFile(filePath) {
    const unzippedFile = await unzip(filePath, config.FILE_PATH_DIR)
    return path.join(config.FILE_PATH_DIR, unzippedFile.entry[0])
}

/** read xls file in json format as stream */
function createXlsReader(file) {
    const workbook = xlsx.readFile(file, {cellDates: true})
    return xlsx.stream.to_json(workbook.Sheets.XLS, {})
}

/** transform xls row into cot object with stream pipeline.
 *  insert cot object to  database
 */
async function insertPipeLine(xlsReaderStream) {


    const pipelineAsync = promisify(pipeline)
    const filterStream = new FilterStream(function (cotRow) {
        return ASSETS[cotRow['Market_and_Exchange_Names']] !== undefined
    })
    const assetTransformStream = new AssetsTransform()
    const insertDbStream = new MongoWriterStream(repoManager.assetRepo(), {batchSize: 30})

    const result = await pipelineAsync(
        xlsReaderStream,
        filterStream,
        assetTransformStream,
        insertDbStream
    )

    return result === undefined
}

async function syncCotReport(date) {
    /** download and write*/
    const downloadReader = await downloadCotReport(date)
    const writeResult = await writeCotReport(downloadReader)

    if (writeResult.completed) {
        const file = await unzipCotFile(path.join(config.FILE_PATH_DIR, config.COT_ZIP_NAME))
        const xlsReaderStream = createXlsReader(file)
        const insertResult = await insertPipeLine(xlsReaderStream)
        if (insertResult)
            removeEntireFile(config.FILE_PATH_DIR)
    } else {
        console.log(writeResult.error)
    }


}


async function importCotReport(zippedFilePath) {
    const file = await unzipCotFile(zippedFilePath)
    const xlsReaderStream = createXlsReader(file)
    const insertResult = await insertPipeLine(xlsReaderStream)
    if (insertResult)
       removeEntireFile(config.FILE_PATH_DIR)
}

module.exports = {
    syncCotReport,
    importCotReport
}