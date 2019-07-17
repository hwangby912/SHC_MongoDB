var express = require('express');
var router = express.Router();

/* GET 진료확인서 작성 폼 요청 */
router.get('/', function(req, res, next) {
  //biz db...
  console.log("세션ID=",req.sessionID);
  let name;
  if(req.session.user_id){
    name=req.session.name;
  }
  res.render('',{
    name 
    });//응답
  
});

module.exports = router;
