console.log('11111');
var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'world'
});

connection.connect();

connection.query('SELECT*FROM city WHERE ID=1',function (error,results,fields) {
    if(error) throw error;
    console.log('the solution is:',results[0].Name)
    console.log('数据库连接成功！')
})