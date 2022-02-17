const path = require('path')
const fs = require('fs')
const BASE_DIR = process.cwd()
const FILE_PATH_DIR = path.join(BASE_DIR, 'files')
if (!fs.existsSync(FILE_PATH_DIR)) {
    fs.mkdirSync(FILE_PATH_DIR)
}


const COT_REPORT_BASE_ENDPOINT = "https://www.cftc.gov/sites/default/files/files/dea/history/"
const COT_ZIP_NAME = 'cot-report.zip'


module.exports = {
    FILE_PATH_DIR,
    BASE_DIR,
    COT_REPORT_BASE_ENDPOINT,
    COT_ZIP_NAME
}
