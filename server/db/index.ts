let mysql=require('mysql')
let db=mysql.createPool({
     host:'127.0.0.1',//数据库IP地址
    user:'root',//数据库登录账号
    password:'123456',//密码
    port:'3306',
    database:'blog',//要操作的数据库
    charset:'utf8mb4'
})
module.exports=db
export{}