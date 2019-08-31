- 先不考虑路由时ssr时html里<!-- app -->没有被替换成server-entry.js的<App />
1. 因为server-entry.js里template.replace()后依然res.send(template)
```javascript
var a='ss1';
a.replace('1','a'); // a依然是'ss1'！！！
```
2. server-entry.js里export default <App />不能写成export default () => <App />，会导致dev-static.js的serverBundle为空字符串
- ssr增加store后，提升’Hooks can only be called inside the body of a function component.‘
[见](https://reactjs.org/warnings/invalid-hook-call-warning.html)
提示原因可能是app里有多个react，fix：webpack.server.config.js里增加externals配置，把package.json里的dependencies不打包到server-entry.js里,对应的改变dev-static.js里执行server-entry.js方法的方式。
3. 本来用react-async-bootstrapper来在ssr的render之前获取异步数据，dev-static.js里有时报错’Hooks can only be called inside the body of a function component.‘有时报奇怪的'createStoreMap is not a function',改用react-ssr-prepass后正常。
