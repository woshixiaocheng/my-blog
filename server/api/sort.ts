import { Request,Response } from "express" //标注类型
import { type } from "os"
import commonRes from "../utils/commonRes"
let db=require('../db/api')//数据库处理封装

/*查找系列*/
//获取文章分类
exports.getSorts=(req:Request,res:Response)=>{
    db.dbQueryAll("sort",res)
  }
  //根据分类id获取分类详情
exports.getAssignSort=(req:Request,res:Response)=>{
    db.dbQueryById('sort','queryById',res,[req.query.id])
  }
// //获取某文章下的所有分类
exports.getArticleSort=(req:Request,res:Response)=>{
    db.dbQueryById('sort','queryByArticleId',res,[req.body.id])
}
//通过分页获取文章分类
exports.getSortsByPage=(req:Request,res:Response)=>{
  db.dbQueryByPage("sort","queryByPage","queryCount",req,res)
}
/*修改系列*/
//修改文章的分类
exports.editArticleSort=(req:Request,res:Response)=>{
  [req.query.sortId,req.query.articleId,req.query.articleId]
  db.dbUpdateById('sort','updateByArticleId',res,[req.query.sortId,req.query.articleId,req.query.articleId])
}

//删除指定分类
exports.delSort=(req:Request,res:Response)=>{
  let id:number=Number(req.query.id)
  if(id===1||id===2){
    console.log(typeof(id),id)
    commonRes.error(res,'serverError')
  }else{
    db.dbDelById('sort',res,[req.query.id])
  }

}

//增加分类
exports.addSort=(req:Request,res:Response)=>{
  db.dbInsertAll('sort',res,[req.query.name,req.query.description])

}

//修改分类
exports.editSort=(req:Request,res:Response)=>{
     db.dbUpdateById('sort','updateAll',res, [req.query.name,req.query.description,req.query.id])

}