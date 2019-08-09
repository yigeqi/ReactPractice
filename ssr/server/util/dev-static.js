const ReactDOMServer = require('react-dom/server');
const MemoryFS = require('memory-fs');
const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const serverConfig = require('../../build/webpack.server.config.js')
const proxy = require('http-proxy-middleware');

const getTemplate = () => {
	return new Promise((resolve, reject) => {
		axios.get('http://localhost:8888/public/index.html')
		.then(res=>resolve(res.data))
		.catch(err => {
      console.error('get template error', err)
    })
	})
}

const mfs = new MemoryFS();
const compiler = webpack(serverConfig);

const Module = module.constructor	
let serverBundle

compiler.outputFileSystem = mfs;
compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
	}
  const info = stats.toJson();
   if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  // 之后读取输出：
  const serverBundleStr = mfs.readFileSync(
  	path.join(serverConfig.output.path, serverConfig.output.filename), 'utf8'
  );
  // 把serverBundleStr变成一个可执行的模块
  const m = new Module()
  m._compile(serverBundleStr, 'server-entry')
  serverBundle = m.exports.default
});

module.exports = (app) => {
	app.use('/public', proxy({target: 'http://localhost:8888'}));

  app.get('*', function (req, res) {
		getTemplate().then( template => {
  		const content = ReactDOMServer.renderToString(serverBundle);
			res.send(template.replace('<!-- app -->', content))
		});
	});
}