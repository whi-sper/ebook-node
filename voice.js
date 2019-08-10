const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const qs = require('qs')
const http = require('http')
const mp3FilePath = require('./const').mp3FilePath
const resUrl = require('./const').resUrl
const fs = require('fs')

function createVoice (req, res) {
  const text = '我的头可不是面团捏的，你可得把劲全使出来啊'
  const lang = 'cn'
  let engineType = 'intp65'
  if (lang.toLowerCase() === 'en') {
    engineType = 'intp65_en'
  }
  const speed = '30'
  const voiceParam = {
    auf: 'audio/L16;rate=16000',
    aue: 'lame',
    voice_name: 'xiaoyan',
    speed,
    volume: '50',
    pitch: '50',
    engine_type: engineType,
    text_type: 'text'
  }

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const appId = '5d4d41c9'
  const apiKey = 'aca9b987e4c58658c9c1f67ce300dcae'
  const xParam = Base64.encode(JSON.stringify(voiceParam))
  const checkSum = md5(apiKey + currentTime + xParam)
  const headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  headers['X-Param'] = xParam
  headers['X-Appid'] = appId
  headers['X-CurTime'] = currentTime
  headers['X-CheckSum'] = checkSum
  headers['X-Real-Ip'] = '127.0.0.1'
  const data = qs.stringify({
    text: text
  })
  const options = {
    host: 'api.xfyun.cn',
    path: '/v1/service/v1/tts',
    method: 'POST',
    headers
  }
  const request = http.request(options, response => {
    let mp3 = ''
    const contentLength = response.headers['content-length']
    response.setEncoding('binary')
    response.on('data', data => {
      mp3 += data
      const process = data.length / contentLength * 100
      const percent = parseInt(process.toFixed(2))
      // console.log(percent)
    })
    response.on('end', () => {
      // console.log(response.headers)
      const contentType = response.headers['content-type']
      if (contentType === 'text/html') {
        res.send(mp3)
      } else if (contentType === 'text/plain') {
        res.send(mp3)
      } else {
        const fileName = new Date().getTime()
        const filePath = `${mp3FilePath}/${fileName}.mp3`
        const downloadUrl = `${resUrl}/mp3/${fileName}.mp3`
        // console.log(filePath, downloadUrl)
        fs.writeFile(filePath, mp3, 'binary', err => {
          if (err) {
            res.json({
              error: 1,
              msg: '下载失败'
            })
          } else {
            res.json({
              error: 0,
              msg: '下载成功',
              path: downloadUrl
            })
          }
        })
      }
    })
  })

  request.write(data)
  request.end()
}

module.exports = createVoice

