const path = require('path')
const fs = require('fs')
const BASE_DIR = process.cwd()
const FILE_PATH_DIR = path.join(BASE_DIR, 'files')
if (!fs.existsSync(FILE_PATH_DIR)) {
    fs.mkdirSync(FILE_PATH_DIR)
}

module.exports = {
    FILE_PATH_DIR,
    BASE_DIR
}
