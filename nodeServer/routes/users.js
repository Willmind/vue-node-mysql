const express = require('express');
const router = express.Router();
const service = require('./../service/userService')
const classService = require('./../service/classFormService')


/* GET users listing. */
//用户登录
router.post('/getUserData', service.getUserData)
//用户注册
router.post('/addUser', service.addUser)
//用户密码修改
router.post('/updateUserPassword', service.updateUserPassword)

//退出登录
router.post('/doLogout', service.doLogout)


//宿舍内务列表
router.post('/uploadDormInterior', service.uploadDormInterior)
router.post('/addDormInteriorList', service.addDormInteriorList)
router.post('/dormitoryInteriorList', service.dormitoryInteriorList)
router.post('/delDormInteriorList', service.delDormInteriorList)
router.post('/updateDormInteriorList', service.updateDormInteriorList)


//新增教室列表
router.post('/addClassFormList', classService.addClassFormList)
router.post('/classFormList', classService.classFormList)
router.post('/classFormQueryOne', classService.classFormQueryOne)
router.post('/delclassFormList', classService.delclassFormList)


//接口暴露，要不无法访问此接口
module.exports = router;
