let db=require('../db/api')//数据库处理封装
import {  Request,Response } from "express" //标注类型
//按照文章id获取特定文章
exports.getCommentByArtId=(req:Request,res:Response)=>{
    console.log(req.query.id)
    db.dbQueryById('comment','queryByArticleId',res,[req.query.id])
  }
  exports.getCommentByParId=(req:Request,res:Response)=>{
    db.dbQueryById('comment','queryByParentId',res,[req.query.id])
  }
  exports.addComment=(req:Request,res:Response)=>{
    db.dbInsertAll('comment',res,[req.query.date,req.query.content,req.query.pid,req.query.userId,req.query.articleId,req.query.parentName])
  }
  export{}