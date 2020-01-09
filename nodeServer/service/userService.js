const db=require('./../sql/dbConfig')

//用户登录
exports.login=(req,res,next)=>{
    let loginForm = req.body.loginForm;
    let sql='select * from user where name=? and password=?';
    let data=[loginForm.username,loginForm.password];
    db.base(sql,data,(response)=>{
        if(response.length==0){
            res.json({
                state:'1',
                msg:'无此结果',
                result:''
            });
        }else {
            res.json({
                state:'0',
                msg:'查询成功',
                result:response[0]
            });
        }
    })

}