import { query, Request,Response } from "express" //标注类型
import commonRes from "../utils/commonRes"
let db=require('../db/api')//数据库处理封装
let conn=require('../db/index')
let sql =require('../db/sql')

/*查询系列    */
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

//根据页面获取文章列表
exports.getArticleByPage=async(req:Request,res:Response)=>{
  db.dbQueryByPage("article","queryByPage","queryCount",req,res)   
}

//通过分页获取某分类下的文章
exports.getSortArticleByPage=(req:Request,res:Response)=>{
  db.dbQueryByPage("article","queryByPageSort","querySortCount",req,res) 
}
//通过分页获取某标签下的文章
exports.getLabelArticleByPage=(req:Request,res:Response)=>{
  db.dbQueryByPage("article","queryByPageLabel","queryLabelCount",req,res) 
}

//通过分页获取标签+分类下的文章
exports.getSLArticleByPage=(req:Request,res:Response)=>{
  db.dbQueryByPage("article","queryByPageSL","querySLCount",req,res) 
}

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

//删除系列
//删除指定文章
exports.delArticle=(req:Request,res:Response)=>{
db.dbDelById('article',res,[req.query.id])
}

//修改系列

//修改文章
exports.editArticle=(req:Request,res:Response)=>{
  db.dbUpdateById('article','updateAll',res,[req.query.title,req.query.description,req.query.content,req.query.newDate,req.query.id])
}

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
exports.addArticle=(req:Request,res:Response)=>{
  
  db.dbInsertAll('article',res,[req.query.title,req.query.description,req.query.content,req.query.userId,req.query.date])
}



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




export{}