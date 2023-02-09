import { Request,Response } from "express" //标注类型
import commonRes from "../utils/commonRes"
let db=require('../db/api')//数据库处理封装
// //获取日记
exports.getDaily=(req:Request,res:Response)=>{
    db.dbQueryAll("daily",res)
}
//根据id获取日记内容
exports.getAssignDaily=(req:Request,res:Response)=>{
    db.dbQueryById('daily','queryById',res,[req.query.id])
}
//根据分页获取日记信息
exports.getDailyByPage=(req:Request,res:Response)=>{
    db.dbQueryByPage("daily","queryByPage","queryCount",req,res) 
}
//修改日记
exports.editDaily=(req:Request,res:Response)=>{
    db.dbUpdateById('daily','updateAll',res, [req.query.content,req.query.date,req.query.id])
  }
  //增加日记
  exports.addDaily=(req:Request,res:Response)=>{
    db.dbInsertAll('daily',res,[req.query.content,req.query.date])
  }
  //删除指定日记
  exports.delDaily=(req:Request,res:Response)=>{
      db.dbDelById('daily',res,[req.query.id])
    }
export{}