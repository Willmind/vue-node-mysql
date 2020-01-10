const express = require('express');
const router = express.Router();
const service = require('./../service/userService')


/* GET users listing. */


router.post('/login',service.login)

//接口暴露，要不无法访问此接口
module.exports = router;
