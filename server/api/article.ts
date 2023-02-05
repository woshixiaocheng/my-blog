import { Request,Response } from "express" //标注类型
let db=require('../db/api')//数据库处理封装
//查询系列
//获取全部文章
exports.getAll=(req:Request,res:Response)=>{
    db.dbQueryAll("article",res)
}
//按照文章id获取特定文章
exports.getAssignArticle=(req:Request,res:Response)=>{
  db.dbQueryById('article','queryById',res,[req.query.id])
}
//获取某分类下的文章
exports.getSortArticle=(req:Request,res:Response)=>{
  db.dbQueryById('article','queryBySortId',res,[req.query.id])
}
//获取某标签下的文章
exports.getLabelArticle=(req:Request,res:Response)=>{
  db.dbQueryById('article','queryByLabelId',res,[req.query.id])
}
// //根据页面获取文章
// exports.getArticleByPage=(req:Request,res)=>{
//     var first=(req.body.page-1)*req.body.size
//     var count=req.body.size//取几条的意思
//     var sql=`select * from articles limit ?,?`
//     conn.query(sql,[first,count],(err,data)=>{
//         res.send(data)
//     })
// }


// //通过分页获取文章标签
// exports.getLabelsByPage=(req:Request,res)=>{
//     var first=(req.query.page-1)*req.query.size
//     var count=Number(req.query.size)//取几条的意思
//     var sql=`select * from labels limit ?,?`
//     conn.query(sql,[first,count],(err,data)=>{
//         res.send(data)
//     })
// }

// //通过分页获取某分类下的文章
// exports.getSortArticleByPage=(req:Request,res)=>{
//     var id=req.body.id
//     var first=(req.body.page-1)*req.body.size
//     var count=req.body.size//取几条的意思
//     var sql=`select * from sort where sort_id=? limit ?,?`
//     conn.query(sql,[id,first,count],(err,results)=>{
//         if(err){
//             throw err
//         }
//         if(results[0]===undefined){
//             const response=new Response(false,'没有此标签！',-1)
//             res.send(response)
//         }else{
//             const response=new Response(true,'获取文章数据成功！',1,results)
//            res.send(response)
//         }
//     })

// }
// //通过分页获取某标签下的文章
// exports.getLabelArticleByPage=(req:Request,res)=>{
//     var id=req.body.id
//     var first=(req.body.page-1)*req.body.size
//     var count=req.body.size//取几条的意思
//     var sql=`select * from label where label_id=? limit ?,?`
//     conn.query(sql,[id,first,count],(err,results)=>{
//         if(err){
//             throw err
//         }
//         if(results[0]===undefined){
//             const response=new Response(false,'没有此标签！',-1)
//             res.send(response)
//         }else{
//             const response=new Response(true,'获取文章数据成功！',1,results)
//            res.send(response)
//         }
//     })
// }

// //按照文章id获取用户名
// exports.getArticleUser=(req:Request,res)=>{
//     var id=req.body.id
//     var sql=`select * from userarticles where article_id=?`
//     conn.query(sql,[id],(err,results)=>{
        
//         if(err){
//             throw err
//         }
//         if(results[0]===undefined){
//             const response=new Response(false,'没有此文章！',-1)
//             res.send(response)
//         }else{
//             const response=new Response(true,'获取用户数据成功！',1,results)
//            res.send(response)
//         }
//     })
// }
// //删除系列
// //删除指定文章
// exports.delArticle=(req:Request,res)=>{
// var sql='delete from articles where article_id=?'
// conn.query(sql,[req.query.id],(err)=>{
//     if(err){
//         throw err
//     }
//     res.send({status:200,message:'删除成功'})
// })
// }



// //删除指定标签
// exports.delLabel=(req:Request,res)=>{
//     var id=Number(req.query.id)
 
//     if(id===1||id===2){
//         console.log(id)
//         res.send({code:0,message:'不能删除该数据！'})
//     }else{
//          var sql='delete from labels where label_id=?'
// conn.query(sql,[id],(err)=>{
//     if(err){
//         throw err
//     }
//     res.send({status:200,message:'删除成功'})
// })
//     }
   
// }


// //增加系列

// //增加文章
// exports.addArticle=(req:Request,res)=>{
//     var sql='insert into articles (article_title,article_description,article_content,user_id,article_date,article_views,article_like_count,article_comment_count) values (?,?,?,?,?,?,?,?)'
//     conn.query(sql,[req.query.title,req.query.description,req.query.content,req.query.id,req.query.date,0,0,0],(err)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'添加成功'})
//     })
// }



// //增加标签
// exports.addLabel=(req:Request,res)=>{
//     var sql='insert into labels (label_name,label_description) values (?,?)'
// conn.query(sql,[req.query.name,req.query.description],(err)=>{
//     if(err){
//         throw err 
//     }
//     res.send({status:200,message:'添加成功'})
// })
// }

// //修改系列

// //修改文章
// exports.editArticle=(req:Request,res)=>{
//     var sql='update articles set article_title=?,article_description=?,article_content=? where article_id=?'
//     conn.query(sql,[req.query.title,req.query.description,req.query.content,req.query.id],(err,data)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'修改成功'})
//     })
// }


// //修改标签
// exports.editLabel=(req:Request,res)=>{
//     var sql='update labels set label_name=?,label_description=? where label_id=?'
//     conn.query(sql,[req.query.name,req.query.description,req.query.id],(err,data)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'修改成功'})
//     })
// }

// //修改文章的标签
// exports.editArticleLabel=(req:Request,res)=>{
//     var sql='update set_article_label set label_id=?,article_id=? where article_id=?'
//     conn.query(sql,[req.query.labelId,req.query.articleId,req.query.articleId],(err,data)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'修改成功'})
//     })
// }

// //修改文章的分类
// exports.editArticleSort=(req,res)=>{
//     var sql='update set_article_sort set sort_id=?,article_id=? where article_id=?'
//     conn.query(sql,[req.query.sortId,req.query.articleId,req.query.articleId],(err,data)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'修改成功'})
//     })
// }
export{}