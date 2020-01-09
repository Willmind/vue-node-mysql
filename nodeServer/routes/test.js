console.log('11111');
var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'user'
});

connection.connect();

connection.query('SELECT*FROM user WHERE id=1',function (error,results,fields) {
    if(error) throw error;
    console.log('the solution is:',results[0].name)
    console.log('数据库连接成功！')
})