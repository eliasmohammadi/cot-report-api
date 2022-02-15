const AdmZip = require('adm-zip')

async function unzip(zipFilePath, outputPath) {
    const result = {entry: []}
    const zip = new AdmZip(zipFilePath)
    for (let entry of zip.getEntries()) {
        result.entry.push(entry.name)
    }
    zip.extractAllTo(outputPath)
    return result
}

module.exports = {
    unzip
}