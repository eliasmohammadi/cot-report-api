const {expressApplication,BASE_END_POINT} = require('./src/configs/express.config')
const {assetRouter} = require('./src/routers/assets.router')
const {connectToDb} = require('./src/configs/db.config')
const repositoryManager = require('./src/repositories/repository.manager')

const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

expressApplication.use(BASE_END_POINT, assetRouter)


connectToDb().then(db => {
    repositoryManager.setDb(db)
})


expressApplication.listen(port, host, () => {
    console.log(`server run on :${host}:${port}`)
})
