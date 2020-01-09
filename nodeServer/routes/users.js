var express = require('express');
var router = express.Router();
// const service=require('./../serviece')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.post('/list',service.userList);

//接口暴露，要不无法访问此接口
module.exports = router;
