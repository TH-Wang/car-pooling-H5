// import axios from 'axios'

export default { getShortLinkUrl }

const token = 'gTTK3dwUcgH6J8ugV7qqSMS1cHQlsOSN'

// 获取短网址
// function getShortLinkUrl (url) {
//   return axios({
//     url: 'https://api.45dwz.cn/apicreate.php?token=' + token,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: { url }
//   })
// }

// 示例代码
function getShortLinkUrl (longUrl) {
  return new Promise((resolve, reject) => {
    var ajax = new XMLHttpRequest()
    ajax.open('post', 'https://api.45dwz.cn/apicreate.php?token=' + token, 'true')
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 发送请求
    var data = 'url=' + longUrl
    ajax.send(data)
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        // 获取缩短后的网址
        console.log()
        resolve(JSON.parse(ajax.responseText).shortUrl)
      }
    }
  })
}
