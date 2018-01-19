const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'build_webpack', 'index.html')
    const assetManifest = path.join(__dirname, 'build_webpack', 'asset-manifest.json')

    const staticPath = express.static(path.join(__dirname, 'build_webpack', 'static'))
    const fontsPath = express.static(path.join(__dirname, 'build_webpack', 'fonts'))
    
    app.use('/static', staticPath)
    app.use('/fonts', fontsPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })
    app.get('/asset-manifest.json', function (_, res) { res.sendFile(assetManifest) })

    return app
  }
}
