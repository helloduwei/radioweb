const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const html = process.argv[2] + '.html'

fs.readFile(html, 'utf-8', function(err, data) {
  convertLess(data)
  replaceHtml(data)
})

function replaceHtml(data) {
  // 将html中的'less'转成'css'
  const htmlStr = data.replace(/\/\less/g, '').replace(/\less/g, 'css')

  fs.writeFile(html, htmlStr, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('completed.')
    }
  })
}

function convertLess(data) {
  // 批量执行lessc，将less转为css
  const lesses = data.match(/(?<=(\/))((?!\/).)*(?=(\.less))/g)
  lesses.forEach(function(item) {
    handleLess(item)
  })
}

function handleLess(name) {
  // 执行less命令
  child_process.execSync(`lessc ${name}.less ${name}.css`, {
    cwd: path.join(__dirname, 'css')
  })
}