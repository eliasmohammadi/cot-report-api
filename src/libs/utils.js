const AdmZip = require('adm-zip')
const {PREFIX_DOWNLOADABLE_FILE_NAME} = require('../entities/constant')
async function unzip(zipFilePath, outputPath) {
    const result = {entry: []}
    const zip = new AdmZip(zipFilePath)
    for (let entry of zip.getEntries()) {
        result.entry.push(entry.name)
    }
    zip.extractAllTo(outputPath)
    return result
}

function getDownloadableFileName(date){
    if(typeof date === 'string'){
        date = new Date(date)
    }
    const year = date.getFullYear()
    return `${PREFIX_DOWNLOADABLE_FILE_NAME}${year}.zip`
}

module.exports = {
    unzip,
    getDownloadableFileName
}