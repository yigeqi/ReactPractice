const ReactDOMServer = require('react-dom/server')
const express = require('express')
const favicon = require('serve-favicon')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
app.use(favicon(path.join(__dirname, '../favicon.ico')))
// 对于Content-Type: application/json的请求体解析
app.use(bodyParser.json())
// 对于Content-Type: application/x-www-form-urlencoded的请求体解析
app.use(bodyParser.urlencoded({extended: false}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'red apple',
  resave: false,
  saveUninitialized: false,
  maxAge: 10 * 60 * 1000
}))

// nodejs代理cnodejs网站的login及其他接口
app.post('/api/login', require('./util/login'))
app.use('/api', require('./util/proxy'));

const isDev = process.env.NODE_ENV==='development'
// 非开发模式下，用dist目录下的静态文件作为ssr输出
if (!isDev) {
	let template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
	const serverEntry = require('../dist/server-entry.js').default

	app.use('/public', express.static(path.join(__dirname, '../dist')));

	app.get('*', function (req, res) {
		res.send(template.replace('<!-- app -->', ReactDOMServer.renderToString(serverEntry)));
	});
} else {
// 开发模式下，用webpack-dev-server保存在内存中的静态文件作为ssr输出 
	require('./util/dev-static.js')(app)
}


app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});
