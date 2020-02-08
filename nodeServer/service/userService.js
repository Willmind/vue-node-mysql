const db = require('./../sql/dbConfig')

function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
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

//教室使用申请列表新增
exports.addClassFormList = (req, res, next) => {
    let addData=req.body
    let uuid= genID(8)
    console.log(addData);
    let sql = 'INSERT INTO classForm(rid,class,phone,teacher,student,organization,teacherPhone,week,section,classroomType,whichDay,number,classRoom,text) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let data = [uuid, addData.class,addData.phone,addData.teacher,addData.student,addData.organization,addData.teacherPhone,addData.week,addData.section,addData.classroomType,addData.whichDay,addData.number,addData.classRoom,addData.text,]
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




