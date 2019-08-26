- 先不考虑路由时ssr时html里<!-- app -->没有被替换成server-entry.js的<App />
1. 因为server-entry.js里template.replace()后依然res.send(template)
```javascript
var a='ss1';
a.replace('1','a'); // a依然是'ss1'啊！！！
```
2. server-entry.js里export default <App />不能写成export default () => <App />，会导致dev-static.js的serverBundle为空字符串

