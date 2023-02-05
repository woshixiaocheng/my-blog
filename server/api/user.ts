 let db=require('../db/index')
import { Request,Response } from "express" //标注类型
import commonRes from "../utils/commonRes"
let jwt=require('jsonwebtoken')//处理token的
import {signStr} from '../app'
//用户登录判断
exports.login=(req:Request,res:Response)=>{
    let user=req.body
    db.query("select * from users where user_phone=?",[user.phone],(err:any,results:any)=>{
        if(err){
            throw err
        }
        if(results[0]===undefined){
            //该手机号还没注册，无法登陆，返回传入参数错误
            commonRes.error(res,'paramError')
        }else{
            //已经注册的比对一下密码和手机号
            if(results[0].user_phone==user.phone&&results[0].user_password==user.password){
                //用户对象信息
                const rule={phone:results[0].user_phone}
                //规则 加密名字（签名的任意字符串） 
                //expiresIn加密的时间 
                const tokenStr=jwt.sign(rule,signStr,{expiresIn:3600})
                commonRes(res,{token:tokenStr},{message:'登陆成功！'})
            }else{
                commonRes.error(res,'paramError',undefined,"密码或手机号错误！")
            }
        }
    })
}

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