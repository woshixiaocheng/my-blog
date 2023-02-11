let mysql=require('mysql')
let db=mysql.createPool({
     host:'47.97.125.199',//数据库IP地址
    user:'blog',//数据库登录账号
    password:'blog',//密码
    port:'3306',
    database:'blog',//要操作的数据库
    charset:'utf8mb4'
})
module.exports=db
export{}