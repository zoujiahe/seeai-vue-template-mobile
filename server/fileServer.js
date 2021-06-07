const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

try {
  console.log(path.resolve(__dirname, './localfile/'))
  mkdirPath(path.resolve(__dirname, './localfile/'))
} catch (e) {
  console.log(e)
}
// multer插件配置：
// 注册一个对象，dest里放的是上传的文件存储的位置，可以在当前目录下，建立一个static目录，上传的文件都放在这里
const upload = multer({ dest: './localfile/' })

// 设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken')
  res.header('Access-Control-Expose-Headers', 'access-control-allow-origin, etag, x-oss-request-id')
  // res.header('Content-Type', 'application/json;charset=utf-8');
  // res.header('Content-Type', 'video/mp4');
  if (req.method.toLowerCase() === 'options') {
    res.send(200) // 让options尝试请求快速结束
  } else {
    next()
  }
})

// 使用中间件，没有挂载路径，应用的每个请求都会执行该中间件。any表示接受一切，具体参考文档。
app.use(upload.any())

// body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use('/localfile', express.static('localfile', {
  setHeaders: (res, urlPath, stat) => {
    const extName = path.extname(urlPath).substr(1)
    if (fs.existsSync(urlPath)) { // 判断本地文件是否存在
      const mineTypeMap = {
        html: 'text/html;charset=utf-8',
        htm: 'text/html;charset=utf-8',
        xml: 'text/xml;charset=utf-8',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        css: 'text/css;charset=utf-8',
        txt: 'text/plain;charset=utf-8',
        mp3: 'audio/mpeg',
        mp4: 'video/mp4',
        ico: 'image/x-icon',
        tif: 'image/tiff',
        svg: 'image/svg+xml',
        zip: 'application/zip',
        ttf: 'font/ttf',
        woff: 'font/woff',
        woff2: 'font/woff2'
      }
      if (mineTypeMap[extName]) {
        res.set({
          'Content-Type': mineTypeMap[extName]
        })
      }
    }
  }
}))

// 跨域
app.use(cors())

app.get('/', (req, res) => {
  res.json({ messge: 'ok' })
})

app.post('/upload', (req, res) => {
  console.log(req)
  console.log(req.files)
  // 拿到后缀名
  const extname = path.extname(req.files[0].originalname)

  // 拼接新的文件路径，文件加上后缀名
  const newPath = req.files[0].path + extname

  // 重命名
  fs.rename(req.files[0].path, newPath, function (err) {
    console.log(newPath)
    if (err) {
      res.send('上传失败')
    } else {
      res.json({
        url: newPath
      })
    }
  })
})

app.listen(8081, () => console.log('server running on 127.0.0.1:8081!'))

/* 用于判断路径是否存在， 如果不存在，则创建一个 */
async function mkdirPath (pathStr) {
  let projectPath = path.join(process.cwd())
  const tempDirArray = pathStr.split('\\')
  for (let i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath + '/' + tempDirArray[i]
    if (await isFileExisted(projectPath)) {
      const tempstats = fs.statSync(projectPath)
      if (!(tempstats.isDirectory())) {
        fs.unlinkSync(projectPath)
        fs.mkdirSync(projectPath)
      }
    } else {
      fs.mkdirSync(projectPath)
    }
  }
  return projectPath
}

/* 判断文件存在 */
function isFileExisted (pathWay) {
  return new Promise((resolve, reject) => {
    fs.access(pathWay, (err) => {
      if (err) {
        reject(err)// "不存在"
      } else {
        resolve(true)// "存在"
      }
    })
  })
}

process.on('unhandledRejection', () => {
  // Will print "unhandledRejection err is not defined"
  // console.log('unhandledRejection', error.message);
  console.log('服务运行正常')
})
