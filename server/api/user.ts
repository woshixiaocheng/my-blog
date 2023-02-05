
// let conn=require('../db/index')
// //操作数据库
// var Response=require('../response') 
// const jwt=require('jsonwebtoken')
// const signStr='lalala'
// //用户登录判断
// exports.login=(req:Request,res:Response)=>{
//     const user:any=req.body
//     const sql=`select * from users where user_phone=?`
//     conn.query(sql,[user.phone],(err,results)=>{
//         if(err){
//             throw err
//         }
//         if(results[0]===undefined){
//             const response=new Response(false,'手机号输入错误或未注册',-1)
//             console.log(response)
//             res.send(response)//-1表示查询不到，手机号填写错误，或没注册
//         }else{
//             if(results[0].user_phone==user.phone&&results[0].user_password==user.password){
//                 //定义规则
//                 const rule={id:results[0].user_id,phone:results[0].user_phone}
//                 //规则 加密名字（签名的任意字符串） 过期信息 
//                 jwt.sign(rule,signStr,{expiresIn:3600},(err,token)=>{
//                     if(err) return err.message
//                     const msg=`Bearer ${token}`
//                     const response=new Response(true,'登录成功！',0,msg)
//                     return res.send(response)
//                 })
                
//             }else{
//                 const response=new Response(false,'手机号或密码输入错误，请重试！',-1)
//                 res.send(response)//1表示用户在但密码不正确
//             }
//         }
//     })
// }

// //用户注册
// exports.register=(req,res)=>{
//     const user=req.body
//     const sql=`insert into users (user_name,user_phone,user_password,user_registration_time) values (?,?,?,?)`
//     conn.query(sql,[user.name,user.phone,user.password,user.createTime],(err)=>{
//         if(err){
//             throw err
//         }
        
//         res.send({status:200,message:'注册成功'})
//     })
// }

// exports.getUser=(req,res)=>{
//     var sql="select * from users"
//     conn.query(sql,(err,data)=>{
//         if(err){
//             return err
//         }
//         res.send(data)
//     })
// }
export{}