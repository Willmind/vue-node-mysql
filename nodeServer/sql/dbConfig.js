// 封装操作数据库的通用api
const mysql=require('mysql');

exports.base=(sql,data,callback)=>{
    //创建数据库连接
    const connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'user'
    });
    //执行连接操作
    connection.connect();

    //操作数据库(数据库操作也是异步的)
    connection.query(sql,data,function (error,results,fields) {
        if(error) throw error;
        callback(results)
        console.log('数据库连接成功')

    });

    //关闭数据库
    connection.end();
}