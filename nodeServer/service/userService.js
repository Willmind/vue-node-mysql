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
//用户注册
exports.register = (req, res, next) => {
    let registerForm = req.body.registerForm;
    let sql = 'INSERT INTO sys_user(name,password) VALUES(?,?)';
    let data = [registerForm.username, registerForm.password]
    db.base(sql, data, (response) => {
        console.log(response);
        if (response.length == 0) {
            res.json({
                status: '1',
                msg: '注册失败',
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '注册成功',
            });
        }
    })
}

 //列表
exports.userList = (req, res,next) => {
    let sql = 'select * from sys_user'
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

//列表删除
exports.deleteUser=(req,res)=>{
    console.log(req.body.name);

    let sql=`DELETE FROM sys_user where name='${req.body.name}'`
    let data=[]
    db.base(sql,data,(response)=>{
        res.json({
            status: '1',
            msg: '11111',
            result: response
        });

    })


}




