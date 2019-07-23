#前言
****
本文记录自己用typescript造axios轮子的一些经验。

**本次记录包括如下内容：**
- 造轮子的过程
- web的基本知识，例如XMLHttpRequest()
- 单元测试

#过程记录

**知识来源**：
构建思路来自[基于TypeScript从零重构axios](https://coding.imooc.com/class/330.html)，有能力请支持正版。

****
先使用TypeScript library starter脚手架构建这个项目
##TypeScript library starter

在你想要生成项目的文件夹下的控制台上输入
```
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
```
先通过 git clone 把项目代码拉下来到我们的 ts-axios 目录，进入`ts-axios`文件夹

初始化项目
```
npm install
```
初始化过程中有个选项让你填YES/NO 填YES就行

##此时的项目结构是











![](https://upload-images.jianshu.io/upload_images/15101357-cf2335cddb37399d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `src`是代码目录
- `test`是测试目录
- `tools`是发布到Git 以及发布到npm的一些配置脚本工具

##好处：
使用**TypeScript library starter**帮我们构建项目的好处是
- 集成了很多优秀的开源工具
例如：
1、使用 [RollupJS](https://rollupjs.org/) 帮助我们打包。
2、使用 [Prettier](https://github.com/prettier/prettier) 和 [TSLint](https://palantir.github.io/tslint/) 帮助我们格式化代码以及保证代码风格一致性。
3、使用 [TypeDoc](https://typedoc.org/) 帮助我们自动生成文档并部署到 GitHub pages。
4、使用 [Jest](https://jestjs.io/)帮助我们做单元测试。
5、使用 [Commitizen](https://github.com/commitizen/cz-cli)帮助我们生成规范化的提交注释。
6、 使用 [Semantic release](https://github.com/semantic-release/semantic-release)帮助我们管理版本和发布。
7、使用 [husky](https://github.com/typicode/husky)帮助我们更简单地使用 git hooks。
8、使用 [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog)帮助我们通过代码提交信息自动生成 change log。
  

##编写基本的请求代码
****
1、在`src`文件夹下创建`index.ts`文件作为主要文件，创建`xhr.ts`文件编写基本的请求代码。

2、同时在`src`文件夹下创建`types`文件夹，里面创建`index.ts`作为类型定义文件。
###此时的src目录结构为
![](https://upload-images.jianshu.io/upload_images/15101357-d7b53b526d591321.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###代码内容
####定义 AxiosRequestConfig 接口类型

其中，`url` 为请求的地址，必选属性；而其余属性都是可选属性。`method `是请求的 `HTTP` 方法；`data` 是 `post`、`patch` 等类型请求的数据，放到 `request body `中的；`params` 是 `get`、`head `等类型请求的数据，拼接到 `url` 的 `query string` 中的。


**types文件夹下的index.ts**
```
export type Method = 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: any
}
```

我们并不想在 index.ts 中去实现发送请求的逻辑，利用模块化的编程思想，把这个功能拆分到一个单独的模块中。

####导出一个 xhr 方法，它接受一个 config 参数，类型也是 AxiosRequestConfig 类型。

**xhr.ts**
```
import { AxiosRequestConfig } from "./types";

export default function xhr(config: AxiosRequestConfig): void {
    const { data = null, url, method = 'get' } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    request.send(data)
}
```
####一些知识点的补充
>XMLHttpRequest.open()

**XMLHttpRequest.open()** 方法初始化一个请求。

#####语法
```
xhrReq.open(method, url);
xhrReq.open(method, url, async);
xhrReq.open(method, url, async, user);
xhrReq.open(method, url, async, user, password);
```
#####参数
- method
要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略。

- url
表示要向其发送请求的URL。
- async(可选)
一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。
- user(可选)
可选的用户名用于认证用途；默认为null。
- password(可选)
可选的密码用于认证用途，默认为null。

>XMLHttpRequest.send()

**XMLHttpRequest.send()** 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。

**XMLHttpRequest.send()**方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。

如果没有使用setRequestHeader（）方法设置 `Accept`头部信息，则会发送带有* / *的`Accept`头部。

#####语法
```
xhr.send(null);
```
####此时主程序代码
```
import { AxiosRequestConfig } from './types/index'
import xhr from './xhr';

function axios(config: AxiosRequestConfig): void {
    xhr(config)
}
export default axios
```

##编写调用实例
****
基本的请求代码的编写完成了，现在我们来写一个例子调用这个基础的Axios

在代码主目录下创建文件夹`examples`
###此时代码目录
![](https://upload-images.jianshu.io/upload_images/15101357-c1cc0e99d7d00aa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)












###安装依赖
首先我们先安装依赖
- webpack
- webpack-dev-middleware
- webpack-hot-middleware
- ts-loader
- tslint-loader
- express
- body-parser

在命令行中输入
```
npm install webpack webpack-dev-middleware  webpack-hot-middleware ts-loader tslint-loader express body-parser --save-dev
```

其中，webpack 是打包构建工具，webpack-dev-middleware 和 webpack-hot-middleware 是 2 个 express 的 webpack 中间件，ts-loader 和 tslint-loader 是 webpack 需要的 TypeScript 相关 loader，express 是 Node.js 的服务端框架，body-parser 是 express 的一个中间件，解析 body 数据用的。

###编写 webpack 配置文件
```
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',

    /**
     * 我们会在 examples 目录下建多个子目录
     * 我们会把不同章节的 demo 放到不同的子目录中
     * 每个子目录的下会创建一个 app.ts
     * app.ts 作为 webpack 构建的入口文件
     * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
     * entries 是一个对象，key 为目录名
     */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        return entries
    }, {}),

    /**
     * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
     */
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
```
###编写 server 文件
```
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)


const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

```
###编写 demo 代码
index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ts-axios examples</title>
    <link rel="stylesheet" href="/global.css">
  </head>
  <body style="padding: 0 20px">
    <h1>ts-axios examples</h1>
    <ul>
      <li><a href="simple">Simple</a></li>
    </ul>
  </body>
</html>
```
global.css
```
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}

a:hover {
  color: #4fc08d;
}
```

然后在 examples 目录下创建 simple 目录，作为本章节的 demo 目录，在该目录下再创建 index.html 和 app.ts 文件

index.html 文件如下:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Simple example</title>
  </head>
  <body>
    <script src="/__build__/simple.js"></script>
  </body>
</html>
```
app.ts 文件如下：
```
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```
###运行
接着我们在 package.json 中去新增一个 npm script：
```
"dev": "node examples/server.js"
```
然后我们去控制台执行命令
```
npm run dev
```
要是觉得上面两步太麻烦可以直接执行
```
node examples/server.js
```
###运行结果
可以看到请求已经发送成功了
![](https://upload-images.jianshu.io/upload_images/15101357-b82a0ccf336f7fc5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


未完待续