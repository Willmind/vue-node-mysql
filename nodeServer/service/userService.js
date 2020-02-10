const db = require('./../sql/dbConfig')


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
    let buildingNum=req.body.buildingNum
    let domNum=req.body.domNum
    let time=req.body.time
    let sql = `SELECT * FROM dormitoryinterior WHERE buildingNum LIKE '%${buildingNum}%' AND domNum LIKE '%${domNum}%'`
    if(time!==''){
        sql=sql+`AND time ='${time}'`
    }

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

//宿舍列表更新编辑
exports.updateDormInteriorList=(req,res)=>{
    let updateData=req.body
    console.log(req.body);
    return
    let sql=`UPDATE dormitoryinterior SET domNum=?,checkPerson=?,score=?,time=?,buildingNum=? WHERE cid=?`
    let data=[updateData.domNum,updateData.checkPerson,updateData.score,updateData.domNum,updateData.domNum]
    db.base(sql,data,(response)=>{
        res.json({
            status: '1',
            msg: '操作成功',
            result: response
        });

    })
}


