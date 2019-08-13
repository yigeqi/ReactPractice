使用express-session,login接口里设置session，但是浏览器里response headers里面没有Set-Cookie,后面发的请求头部也没有自动带上cookie，node这边也得不到cookie，但是在开发者工具applictaion里可以看到cookie，试了是不是跨域，两端都加上跨域的设置后也不行（其实并没有跨域，客户端是localhost:3333,服务器是localhost:8888,但client里的请求地址用的都是本地地址，通过webpack的proxy代理到localhost:8888的），最后换了一个wifi又正常了。。。。。。但是req.cookies依然是undefined, 但是req.headers.cookie里有字符串形式的cookie，应该是要加cookie-session之类的包才可以直接取req.cookies。 
---   
webpack配置项的output对象的publicPath: '/public/'作用是使编译出的js文件用这个路径来访问/引入。   
---   
html-webpack-plugin会在build的时候自动生成一个html文件，并引入编译好的js文件，也可以传入templatec参数来指定一个自定义的html文件。
---   
对于react项目，要添加babel来支持jsx，es6以及babel-loader。   
---   
配置用于ssr的webpack.config.js：修改entry为server-entry.js，增加taget：‘node’，output.libraryTarget:'commonjs2'//采用node的commonjs规范打包文件。server-entry.js直接返回<App />给ssr用来放在id=root里,不像客户端index.js是：react.render(<App />, document.getElementById('#root')),因为server端根本没有document或window对象。   
---  
在不考虑ssr路由的情况下，ssr就是先build在dist文件夹里生成index.html和编译好的main.js（用于客户端），server-entry.js(用于服务端），在server.js里读取index.html，保存为字符串，再把字符串里的root节点里预先写好的"<!-- app -->"替换成ReactDOMServer.renderToString(serverEntry)作为resp返回。   
---   
通过引入cross-env，可以跨环境的用process.env来设置和读取是开发环境development还是生产环境production。    
---   
开发时，通过webpack-dev-server和hot-module-replacement（引入react-hot-loader）时client端代码修改时自动重新编译且浏览器通过webpack-dev-server访问的页面自动热更新。配置webpack的devServer，在app.js和index.js里使用module.hot处理App，用webpack-dev-server代替webpack命令执行config文件。   
---  
开发时，如何做到从server端访问时也会随着client端代码修改而自动更新：先启动client端的webpack-dev-server,把server.js改成若在开发环境下，则不直接从dist读取文件，而是先通过axios.get('http://localhost:8888/public/index.html')获得client端的html文件，再通过compiler=webpack(webpack.server.config.js)得到webpack的Compiler 实例。默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。但是，配置outputFileSystem,并添加memory-fs包，使得webpack的输出文件都保存在内存里。在compiler.watch()方法里取出文件替换掉之前得到的html文件里的"<!-- app -->"。  
---  
开发时，如何做到server端修改代码时，服务器也会自动更新重启：使用nodemon代替node命令启动服务，可增加nodemon.json配置文件。   
---   




