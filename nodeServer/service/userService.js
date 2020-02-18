const db = require('./../sql/dbConfig')

function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

//登陆
exports.getUserData = (req, res, next) => {

    let account = req.body.account
    let password = req.body.password

    let sql = `select * from accountForm where account='${account}'`;
    let data = [];
    db.base(sql, data, (response) => {
        if (response.length == 0) {
            res.json({
                status: '0',
                msg: '无此用户名',
                result: response[0]
            });
        } else {
            console.log(response[0].password);
            if(password==response[0].password){
                res.json({
                    status: '1',
                    msg: '查询成功',
                    result: response[0]
                });
            }else{
                res.json({
                    status: '2',
                    msg: '查询失败',
                    result: response[0]
                });
            }

        }
    })

}

//用户注册
exports.addUser = (req, res, next) => {
    var addData = req.body
    console.log(addData);
    let sql = `SELECT * FROM accountform where account='${addData.registerAccount}'`
    let data=[]

    db.base(sql, data, (response) => {
        console.log(response);
        if (response.length == 0) {
            let rid= genID(8)
            let adminPermission='0'
            let sql2 = 'INSERT INTO accountform(rid,account,password,adminPermission) VALUES(?,?,?,?)';
            let data2 = [rid,addData.registerAccount, addData.registerPassword,adminPermission]

            db.base(sql2, data2, (response2) => {
                console.log(response2);
                if (response2.length == 0) {
                    res.json({
                        status: '1',
                        msg: '新增失败',
                        result: ''
                    });
                } else {
                    res.json({
                        status: '2',
                        msg: '新增成功',
                    });
                }
            })



        } else {
            res.json({
                status: '0',
                msg: '查询成功',
            });
        }
    })


}
//用户密码修改
exports.updateUserPassword = (req, res) => {
    let updateData = req.body
    let passwordForm=updateData.passwordForm
    let sql = `SELECT * FROM accountform where rid='${updateData.rid}'`
    let data=[]
    db.base(sql, data, (response) => {
        console.log(response[0].password);
        //密码确认成功

        if(passwordForm.oldPassword===response[0].password){
            let sql2 = `UPDATE accountform SET password=? WHERE rid=?`
            let data2 = [passwordForm.newPassword,updateData.rid]
            db.base(sql2, data2, (response) => {
                res.json({
                    status: '1',
                    msg: '操作成功',
                });
            })
        }else{
            res.json({
                status: '0',
                msg: '密码错误',
            });
        }

    })

}

//退出登录
exports.doLogout=function(req,res,next){
    console.log(req);
    return
    req.session.destroy(function(err){
        if(err){
            console.log("退出失败!");
            return;
        }
        //清除登录cookie
        res.clearCookie(user_key)
        res.redirect("/")
    })
}



//宿舍内务列表详情页
exports.uploadDormInterior = (req, res, next) => {
    console.log(req.body.cid);
    let cid = req.body.cid;
    let sql = 'select * from dormitoryinterior where cid=?';
    let data = [cid];
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
    let addData = req.body
    console.log(addData.rate);
    let sql = 'INSERT INTO dormitoryinterior(domNum,checkPerson,score,time,buildingNum) VALUES(?,?,?,?,?)';
    let data = [addData.domNum, addData.checkPerson, addData.rate, addData.time, addData.buildingNum]
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
exports.dormitoryInteriorList = (req, res, next) => {
    let buildingNum = req.body.buildingNum
    let domNum = req.body.domNum
    let time = req.body.time
    let sql = `SELECT * FROM dormitoryinterior WHERE buildingNum LIKE '%${buildingNum}%' AND domNum LIKE '%${domNum}%'`
    if (time !== '') {
        sql = sql + `AND time ='${time}'`
    }

    let data = []
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
                result: response,
            });
        }
    })
}

//宿舍列表删除
exports.delDormInteriorList = (req, res) => {
    console.log(req.body.cid);
    let sql = `DELETE FROM dormitoryinterior where cid='${req.body.cid}'`
    let data = []
    db.base(sql, data, (response) => {
        res.json({
            status: '1',
            msg: '操作成功',
            result: response
        });

    })
}

//宿舍列表更新编辑
exports.updateDormInteriorList = (req, res) => {
    let updateData = req.body
    console.log(req.body);
    return
    let sql = `UPDATE dormitoryinterior SET domNum=?,checkPerson=?,score=?,time=?,buildingNum=? WHERE cid=?`
    let data = [updateData.domNum, updateData.checkPerson, updateData.score, updateData.domNum, updateData.domNum]
    db.base(sql, data, (response) => {
        res.json({
            status: '1',
            msg: '操作成功',
            result: response
        });

    })
}


