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
//修改文章的标签
exports.editArticleLabel=(req:Request,res:Response)=>{
db.dbUpdateById('label','updateByArticleId',res,[req.query.labelId,req.query.articleId,req.query.articleId])
}

// //通过分页获取文章标签
// exports.getLabelsByPage=(req:Request,res)=>{
//     var first=(req.query.page-1)*req.query.size
//     var count=Number(req.query.size)//取几条的意思
//     var sql=`select * from labels limit ?,?`
//     conn.query(sql,[first,count],(err,data)=>{
//         res.send(data)
//     })
// }
  