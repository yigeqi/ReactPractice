- 结合webpack的devServer配置HMR:hot-module-replacement   
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
