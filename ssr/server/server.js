const ReactDOMServer = require('react-dom/server')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 把json格式和表单形式的post请求的数据都可以通过req.body取得
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'red apple'
}))
app.use(favicon(path.join(__dirname, '../favicon.ico')))

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev:', isDev)

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

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
