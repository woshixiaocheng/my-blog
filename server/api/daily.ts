import { Request,Response } from "express" //标注类型
let db=require('../db/api')//数据库处理封装
// //获取日记
exports.getDaily=(req:Request,res:Response)=>{
    db.dbQueryAll("daily",res)
}
export{}