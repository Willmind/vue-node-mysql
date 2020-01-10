const db=require('./../sql/dbConfig')

//用户登录
exports.login=(req,res,next)=>{
    let loginForm = req.body.loginForm;
    let sql='select * from sys_user where name=? and password=?';
    let data=[loginForm.username,loginForm.password];
    db.base(sql,data,(response)=>{
        if(response.length==0){
            res.json({
                status:'1',
                msg:'无此结果',
                result:''
            });
        }else {
            res.json({
                status:'0',
                msg:'查询成功',
                result:response[0]
            });
        }
    })

}