const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 8088
const cheerio = require('cheerio')
const lessStr = '<script src="./js/less.js"></script><script>less.watch()</script>'
const html = process.argv[2] + '.html'

fs.readFile(html, 'utf-8', function(err, data) {
  handleHtml(data)
})

function handleHtml (data) {
  // 自动注入less配置
  let $ = null
  $ = cheerio.load(data)
  let headStr = $('head').html()
  headStr += lessStr
  $('head').html(headStr)

  app.get('/', function(req, res){
    res.send($('html').html());
  })

  app.use(express.static(path.join(__dirname, '/')))

  app.listen(port, function() {
    console.log('i am listening')
  })
}