import commonRes from "../utils/commonRes"
import { Response } from "express"
let db=require('../db/index')
let sql=require("./sql")

/**
 * @description 查找全部数据
 * @param {str} table 数据库表的名称
 * @param {obj} req 插入的数据
 * @param {Response} res 接口函数中的res对象
 * @param {obj} option 接口函数中的返回对象(不知道是什么)
 */
let dbQueryAll=(table:string,res:Response,req?:Object,option?:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table].queryAll,(err:any,data:object)=>{
            option?commonRes(res,data,option):commonRes(res,data)
            conn.release()
    })
    })
}
//通过自定义条件查找数据
let dbQueryById=(table:string,key:string,res:Response,req?:Object,option?:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table][key],req,(err:any,data:object)=>{
            option?commonRes(res,data,option):commonRes(res,data)
            conn.release()
    })
    })
}

module.exports={
    dbQueryAll,
    dbQueryById
}