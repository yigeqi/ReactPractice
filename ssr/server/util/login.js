const axios = require('axios')
const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = (req, res, next) => {
  axios.post(baseUrl + '/accesstoken', {
    accesstoken: req.body.accesstoken
  }).then( resp => {
    if (resp.status === 200 && resp.data.success === true) {
      req.session.user = { accessToken: req.body.accesstoken }
      res.send(resp.data)  
    }
  }).catch( err => {
    if (err.response) {
      res.status(500).json({success: false, data: err.response.data})
    } else {
      next(err)
    }
  })
}
