 let conn=require('../db/index')
 let db=require('../db/api')
import { Request,Response } from "express" //标注类型
import commonRes from "../utils/commonRes"
let jwt=require('jsonwebtoken')//处理token的
import {signStr} from '../app'
//用户登录判断
exports.login=(req:Request,res:Response)=>{
    let user=req.body
    conn.query("select * from users where user_phone=?",[user.phone],(err:any,results:any)=>{
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
                commonRes(res,{token:tokenStr,phone:user.phone},{message:'登陆成功！'})
            }else{
                commonRes.error(res,'paramError',undefined,"密码或手机号错误！")
            }
        }
    })
}

//用户注册
exports.register=(req:Request,res:Response)=>{
    let user=req.body
        // 要先判断有没有之前已经出现手机号的才能注册吧
    conn.query("select * from users where user_phone=?",[user.phone],(err:any,results:any)=>{
        if(err){
            throw err
        }
        if(results[0]!==undefined){
            //该手机号已经注册，不能再注册了返回传参错误
            commonRes.error(res,'paramError')
        }
    })
    //插入注册信息
    const sql=`insert into users (user_name,user_phone,user_password,user_registration_time) values (?,?,?,?)`
    conn.query(sql,[user.name,user.phone,user.password,user.createTime],(err:any,data:any)=>{
        if(err){
            throw err
        }

        //获取插入后得到的id
            const sql1=`insert into set_user_permission (user_id,permission_id) values (?,?)`
    conn.query(sql1,[data.insertId,1],(err:any,data:any)=>{
        if(err){
            throw err
        }
        commonRes(res,data)
    })
    })
    //插入权限信息

}
//获取用户信息列表
exports.getUser=(req:Request,res:Response)=>{

    var sql="select user_id,user_name,user_phone,user_photo,user_registration_time from users"
    conn.query(sql,(err:any,data:any)=>{
        commonRes(res,data)
    })
}
//根据用户id获取用户信息
exports.getUserInfo=(req:Request,res:Response)=>{
    db.dbQueryById('user','queryById',res,[req.query.phone])
}
export{}