const express = require('express');
const router = express.Router();
const service = require('./../service/userService')


/* GET users listing. */

//宿舍内务列表
router.post('/uploadDormInterior',service.uploadDormInterior)
router.post('/addDormInteriorList',service.addDormInteriorList)
router.post('/dormitoryInteriorList',service.dormitoryInteriorList)
router.post('/delDormInteriorList',service.delDormInteriorList)
router.post('/updateDormInteriorList',service.updateDormInteriorList)

//新增教室列表
router.post('/addClassFormList',service.addClassFormList)





//接口暴露，要不无法访问此接口
module.exports = router;
