**** 结合webpack的devServer配置HMR:hot-module-replacement   
安装react-hot-loader,综合这三个的文档：    
1. devServer里开启hot:true，   
entry里增加react-hot-loader/patch,   
plugin里增加:HotModuleReplacementPlugin()   
2. .babelrc中增加react-hot-loader 
3. 入口文件index.js里
```javascript
module.hot.accept('./views/App', () => {
    ReactDom.hydrate(App, root)
  })
```
app.js文件里
```
import { hot } from 'react-hot-loader/root';
export default hot(App);
``` 
---   
**** 开发时，如何做到从server端访问时也会随着client端代码修改而自动更新   
重点是监听并获取到每次文件修改自动build后的新文件给server重新渲染。   
先启动client端的webpack-dev-server,把server.js改成若在开发环境下，则不直接从dist读取文件，而是先通过axios.get('http://localhost:8888/public/index.html')获得client端的html文件，再通过compiler=webpack(webpack.server.config.js)得到webpack的Compiler。默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。但是，配置outputFileSystem,并添加memory-fs包，使得webpack的输出文件都保存在内存里。在compiler.watch()方法里取出文件替换掉之前得到的html文件里的""。  
