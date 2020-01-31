const db = require('./../sql/dbConfig')

//用户登录
exports.login = (req, res, next) => {
    let loginForm = req.body.loginForm;
    let sql = 'select * from sys_user where name=? and password=?';
    let data = [loginForm.username, loginForm.password];
    db.base(sql, data, (response) => {
        if (response.length == 0) {
            res.json({
                status: '1',
                msg: '无此结果',
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '查询成功',
                result: response[0]
            });
        }
    })

}
//宿舍内务列表新增
exports.addDormInteriorList = (req, res, next) => {
    let addData=req.body
    console.log(addData.rate);
    let sql = 'INSERT INTO dormitoryinterior(domNum,checkPerson,score,time,buildingNum) VALUES(?,?,?,?,?)';
    let data = [addData.domNum, addData.checkPerson,addData.rate,addData.time,addData.buildingNum]
    db.base(sql, data, (response) => {
        console.log(response);
        if (response.length == 0) {
            res.json({
                status: '1',
                msg: '新增失败',
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '新增成功',
            });
        }
    })
}

 //宿舍内务列表展示
exports.dormitoryInteriorList = (req, res,next) => {
    let sql = 'select * from dormitoryinterior'
    let data=[]
    db.base(sql, data,(response) => {
        if (response.length == 0) {
            res.json({
                status: '1',
                msg: '无此结果',
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '查询成功',
                result: response,
            });
        }
    })
}

//宿舍列表删除
exports.delDormInteriorList=(req,res)=>{
    console.log(req.body.cid);
    let sql=`DELETE FROM dormitoryinterior where cid='${req.body.cid}'`
    let data=[]
    db.base(sql,data,(response)=>{
        res.json({
            status: '1',
            msg: '操作成功',
            result: response
        });

    })


}




