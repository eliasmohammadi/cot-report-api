const {describe, it} = require('mocha')
const {expect} = require('chai')
const fs = require('fs')
const path = require('path')

const util = require('../src/libs/utils')

const AdmZip = require('adm-zip')

function createZipFile(){

    const testDir = path.join(process.cwd(),'test','test-files')
    if(!fs.existsSync(testDir))
        fs.mkdirSync(testDir)
    const fakeData  = {
        content:"test"
    }
    const testFile = path.join(testDir,'test-text.txt')

    fs.writeFileSync(testFile,JSON.stringify(fakeData))

    const zip = new AdmZip()
    zip.addLocalFile(testFile)
    const zipFile = path.join(testDir,'test-zip.zip')
    zip.writeZip(zipFile,()=>{
        fs.unlinkSync(testFile)
    })
    return zipFile
}


describe("Utils Test", () => {

    it("should unzip downloaded file",async ()=>{

        //TODO
        //     2: unzip file in specific folder
        //     3: remove zip and unzipped files after test pass

        const zipFile = createZipFile()
        const outputPathDir = path.join(process.cwd(),'test','test-files')
        const unzippedFile = await util.unzip(zipFile,outputPathDir)


        const outputFile = path.join(outputPathDir,unzippedFile.entry[0])
        const isExists = fs.existsSync(outputFile)

        expect(isExists).to.be.eq(true)

        fs.rmSync(outputPathDir,{recursive:true,force:true})


    })
})