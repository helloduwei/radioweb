const fs = require('fs')
const html = process.argv[2] + '.html'

fs.readFile(html, 'utf-8', function(err, data) {
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
  const lesses = data.match(/(?<=\/).*?(?=\.less)/i)
  console.log(lesses)

}