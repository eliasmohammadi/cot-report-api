const AdmZip = require('adm-zip')
const {PREFIX_DOWNLOADABLE_FILE_NAME} = require('../entities/constant')
const fs = require('fs')
const path = require('path')
async function unzip(zipFilePath, outputPath) {
    const result = {entry: []}
    const zip = new AdmZip(zipFilePath)
    for (let entry of zip.getEntries()) {
        result.entry.push(entry.name)
    }
    zip.extractAllTo(outputPath)
    return result
}

function getDownloadableFileName(date) {
    if (typeof date === 'string') {
        date = new Date(date)
    }
    const year = date.getFullYear()
    return `${PREFIX_DOWNLOADABLE_FILE_NAME}${year}.zip`
}

function removeEntireFile(folderPath) {
    fs.readdir(folderPath,(err,files)=>{
        for(let f of files){
            fs.unlink(path.join(folderPath,f),()=>{

            })
        }
    })
}

module.exports = {
    unzip,
    getDownloadableFileName,
    removeEntireFile
}