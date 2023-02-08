import { Request,Response } from "express" //标注类型
let db=require('../db/api')//数据库处理封装
import commonRes from '../utils/commonRes'
//获取文章标签
exports.getLabels=(req:Request,res:Response)=>{
    db.dbQueryAll("label",res)
  }
  
// //获取某文章下的所有标签
exports.getArticleLabel=(req:Request,res:Response)=>{
    db.dbQueryById('label','queryByArticleId',res,[req.body.id])
}
//通过分页获取文章标签
exports.getLabelsByPage=(req:Request,res:Response)=>{
  db.dbQueryByPage("label","queryByPage","queryCount",req,res)
}
  
//修改文章的标签
exports.editArticleLabel=(req:Request,res:Response)=>{
db.dbUpdateById('label','updateByArticleId',res,[req.query.labelId,req.query.articleId,req.query.articleId])
}
//修改标签
exports.editLabel=(req:Request,res:Response)=>{
  db.dbUpdateById('label','updateAll',res, [req.query.name,req.query.description,req.query.id])
}
//增加标签
exports.addLabel=(req:Request,res:Response)=>{
  db.dbInsertAll('label',res,[req.query.name,req.query.description])
}
//删除指定标签
exports.delLabel=(req:Request,res:Response)=>{
  let id:number=Number(req.query.id)
  if(id===1||id===2){
    commonRes.error(res,'serverError')
  }else{
    db.dbDelById('label',res,[req.query.id])
  }
}







