const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = (req, res, next) => {
  // 假定需要login后才能访问的接口都会在query里添加needAccessToken=true
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  // 正式发请求前再把query里的needAccessToken删掉
  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET' ? user.accessToken : '')
  })
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${req.path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST' ? user.accessToken : '')
    })
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: 'unknown error.'
      })
    }
  })
}
