import { Request,Response } from "express" //标注类型
let db=require('../db/api')//数据库处理封装
//获取文章标签
exports.getLabels=(req:Request,res:Response)=>{
    db.dbQueryAll("label",res)
  }
  
// //获取某文章下的所有标签
exports.getArticleLabel=(req:Request,res:Response)=>{
    db.dbQueryById('label','queryByArticleId',res,[req.body.id])
}
  