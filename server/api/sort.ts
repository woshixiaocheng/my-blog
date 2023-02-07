import { Request,Response } from "express" //标注类型
let db=require('../db/api')//数据库处理封装

/*查找系列*/
//获取文章分类
exports.getSorts=(req:Request,res:Response)=>{
    db.dbQueryAll("sort",res)
  }
// //获取某文章下的所有分类
exports.getArticleSort=(req:Request,res:Response)=>{
    db.dbQueryById('sort','queryByArticleId',res,[req.body.id])
}
/*修改系列*/
//修改文章的分类
exports.editArticleSort=(req:Request,res:Response)=>{
  [req.query.sortId,req.query.articleId,req.query.articleId]
  db.dbUpdateById('sort','updateByArticleId',res,[req.query.sortId,req.query.articleId,req.query.articleId])
}

// //通过分页获取文章分类
// exports.getSortsByPage=(req:Request,res)=>{
//     var first=(req.query.page-1)*req.query.size
//     var count=Number(req.query.size)//取几条的意思
//     var sql=`select * from sorts limit ?,?`
//     conn.query(sql,[first,count],(err,data)=>{
//         res.send(data)
//     })
// }


// //删除指定分类
// exports.delSort=(req:Request,res)=>{
//     var id=Number(req.query.id)
 
//     if(id===1||id===2){
//         console.log(id)
//         res.send({code:0,message:'不能删除该数据！'})
//     }else{
//          var sql='delete from sorts where sort_id=?'
// conn.query(sql,[id],(err)=>{
//     if(err){
//         throw err
//     }
//     res.send({status:200,message:'删除成功'})
// })
//     }
   
// }


// //增加分类
// exports.addSort=(req:Request,res)=>{
// var sql='insert into sorts (sort_name,sort_description) values (?,?)'
// conn.query(sql,[req.query.name,req.query.description],(err)=>{
//     if(err){
//         throw err 
//     }
//     res.send({status:200,message:'添加成功'})
// })
// }

// //修改分类
// exports.editSort=(req:Request,res)=>{
//     var sql='update sorts set sort_name=?,sort_description=? where sort_id=?'
//     conn.query(sql,[req.query.name,req.query.description,req.query.id],(err,data)=>{
//         if(err){
//             throw err 
//         }
//         res.send({status:200,message:'修改成功'})
//     })
// }