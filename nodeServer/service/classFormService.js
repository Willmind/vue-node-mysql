const db = require('./../sql/dbConfig')

function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
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




//教室使用申请列表展示
exports.classFormList = (req, res,next) => {
    // let buildingNum=req.body.buildingNum
    // let domNum=req.body.domNum
    // let time=req.body.time
    let sql = `SELECT * FROM classform`
    // if(time!==''){
    //     sql=sql+`AND time ='${time}'`
    // }

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

//教室使用申请列表详情展示
exports.classFormQueryOne = (req, res,next) => {
    // let buildingNum=req.body.buildingNum
    // let domNum=req.body.domNum
    // let time=req.body.time
    console.log(req.body.rid);
    let sql = `SELECT * FROM classform where rid='${req.body.rid}'`
    // if(time!==''){
    //     sql=sql+`AND time ='${time}'`
    // }

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
                result: response[0],
            });
        }
    })
}
