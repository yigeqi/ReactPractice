const axios = require('axios')
const express = require('express')
const router = express.Router()
const baseUrl = 'https://cnodejs.org/api/v1'

router.use((req, res, next) => {
  //  先判断是否有权限访问接口
  const needAccessToken = req.query.accessToken === 'true'
  // 注意此处 req.query = {accessToken: 'true'}
  const user = req.session.user || {}
  console.log(req.session)
  if (needAccessToken && !user.accessToken) {
    res.status(401).json({success: false, data: 'need login'})
  } else {
    // needAccessToken是nodejs这边自己加上的，所以要删去再发真正的请求
    const query = Object.assign({},req.query)
    const body = Object.assign({}, req.body)
    if (needAccessToken) {
      delete query.accessToken
      body.accesstoken = user.accessToken
    }
    const options = {
      method: req.method,
      url: baseUrl + req.path,
      params: query,
      data: body
    }
    axios(options).then( resp => {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    }).catch( err => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        next(err)
      }
    });
  }
});

module.exports = router;
