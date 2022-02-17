const axios = require('axios')
const config = require("../configs/app.config")
const {getDownloadableFileName} = require('../libs/utils')
const fs = require('fs')
const path = require('path')
async function downloadCotReport(){
    const endpoint = `${config.COT_REPORT_BASE_ENDPOINT}${getDownloadableFileName(new Date())}`

    const result = await axios.get(endpoint,{
        responseType:"stream"
    })

    const fileName = path.join(config.FILE_PATH_DIR,config.COT_ZIP_NAME)
    const writer = fs.createWriteStream(fileName)
    result.data.pipe(writer)

}

module.exports = {
    downloadCotReport
}