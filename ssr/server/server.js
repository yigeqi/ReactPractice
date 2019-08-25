const ReactDOMServer = require('react-dom/server')
const express = require('express')
const favicon = require('serve-favicon')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(favicon(path.join(__dirname, '../favicon.ico')))

const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
  // 生产模式下，直接使用build生成的dist文件夹里的index.html和js文件
  const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf8')
  const serverEntry = require('../dist/server-entry.js').default

  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) {
    res.send(template.replace('<!-- app -->', ReactDOMServer.renderToString(serverEntry)))
  })
} else {
  require('./util/dev-static.js')(app)
}

app.listen(3333, function () {
  console.log('Example app listening on port 3333!')
})
