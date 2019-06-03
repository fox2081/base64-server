const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const app = express()
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(__dirname + './upload'))
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.listen('8083', function () {
  console.log('服务启动')
})
app.post('/upload', multipartMiddleware, (req, res) => {
  let imgData = req.body.imgData
  let date = req.body.date
  console.log('接收：', req.body)
  let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
  let dataBuffer = new Buffer(base64Data, 'base64')
  let imgUrl = `imagesDist/image-${date}.png`
  fs.writeFile(imgUrl, dataBuffer, err => {
    if (err) {
      res.send(err)
      console.log('err', err)
    } else {
      res.send('保存成功！')
      console.log('success')
    }
  })
})
