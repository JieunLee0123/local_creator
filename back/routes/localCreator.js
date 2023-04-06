const express = require('express');
const router = express.Router();
const axios = require('axios')

const url = 'https://www.k-startup.go.kr/web/module/getLocalCreatorList.ajax'

router.post('/', function (req, res, next) {
  const { reginCd, pageCnt } = req.body

  const headers = {
    "headers": 'application/x-www-form-urlencoded'
  }  

  const getData = async (pageCnt) => {
    let dataStr = ''

    for (let i = 1; i <= pageCnt; i++){
      const data = new URLSearchParams({
        page: i,
        reginCd: reginCd,
        korYn: 'Y',
        useYn: 'Y',
        IdntrpYn: 'Y'
      })
      
      await axios
      .post(url, data, headers)
      .then((response) => {
        dataStr += response.data
        if (i === pageCnt) {
          res.send(dataStr)
        }
      })
      .catch((err) => {
        res.send(err)
      })
    }
  }
  
  getData(pageCnt)
});

module.exports = router;