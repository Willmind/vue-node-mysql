var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'user'
});

connection.connect();

var sql='select * from sys_user'

connection.query(sql,function (error,results,fields) {
    if(error) throw error;
    console.log(results);
    // console.log('the solution is:',results[0].password)
    console.log('数据库连接成功！')
})
