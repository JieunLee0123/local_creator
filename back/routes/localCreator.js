const express = require('express');
const router = express.Router();
const axios = require('axios')

const url = 'https://www.k-startup.go.kr/web/module/getLocalCreatorList.ajax'
const headers = {
  "headers": 'application/x-www-form-urlencoded'
} 

const localsArr = [
  { reginCd: "LC01", pageCnt: 6, value: "서울" },
  { reginCd: "LC02", pageCnt: 4, value: "부산" },
  { reginCd: "LC03", pageCnt: 4, value: "대구" },
  { reginCd: "LC04", pageCnt: 4, value: "인천" },
  { reginCd: "LC05", pageCnt: 4, value: "광주" },
  { reginCd: "LC06", pageCnt: 3, value: "대전" },
  { reginCd: "LC07", pageCnt: 3, value: "울산" },
  { reginCd: "LC08", pageCnt: 4, value: "경기" },
  { reginCd: "LC09", pageCnt: 9, value: "강원" },
  { reginCd: "LC10", pageCnt: 4, value: "충남" },
  { reginCd: "LC11", pageCnt: 4, value: "충북" },
  { reginCd: "LC12", pageCnt: 3, value: "경남" },
  { reginCd: "LC13", pageCnt: 4, value: "경북" },
  { reginCd: "LC14", pageCnt: 4, value: "전남" },
  { reginCd: "LC15", pageCnt: 4, value: "전북" },
  { reginCd: "LC16", pageCnt: 9, value: "제주" },
  { reginCd: "LC17", pageCnt: 3, value: "세종" },
]

const getDataStr = async (data) => {
  let dataStr = ''
  await axios
    .post(url, data, headers)
    .then((response) => {
      dataStr += response.data
    })
    .catch((err) => {
      res.send(err)
    })
  
  return dataStr
}

const loopRequest = async (reginCd, pageCnt) => {
  let dataStr = ''

  for (let i = 1; i <= pageCnt; i++){
    const data = new URLSearchParams({
      page: i,
      reginCd: reginCd,
      korYn: 'Y',
      useYn: 'Y',
      IdntrpYn: 'Y'
    })
    
    dataStr += await getDataStr(data)
  }

  return dataStr
}
  
router.get('/', function (req, res, next) {  
  const getDatas = async localsArr => {
    let datasStr = ''
    for (let localObj of localsArr) {
      datasStr += await loopRequest(localObj.reginCd, localObj.pageCnt)
    }
    res.send(datasStr)
  }

  getDatas(localsArr)
})

router.post('/', async function (req, res, next) {  
  const { value } = req.body

  const [reginCd, pageCnt] = [
    localsArr.find(obj => obj.value === value).reginCd,
    localsArr.find(obj => obj.value === value).pageCnt,
  ]
  
  const dataStr = await loopRequest(reginCd, pageCnt)
  res.send(dataStr)
});

module.exports = router;