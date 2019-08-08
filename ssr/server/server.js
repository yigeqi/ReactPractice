const ReactDOMServer = require('react-dom/server')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
let template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
const serverEntry = require('../dist/server-entry.js').default

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', function (req, res) {
	res.send(template.replace('<!-- app -->', ReactDOMServer.renderToString(serverEntry)));
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});