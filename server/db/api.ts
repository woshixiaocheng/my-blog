import commonRes from "../utils/commonRes"
import  { Response } from "express"
let db=require('../db/index')
let sql=require("./sql")

/**
 * @description 查找全部数据
 * @param {str} table 数据库表的名称
 * @param {obj} req 插入的数据
 * @param {Response} res 接口函数中的res对象
 * @param {obj} option 接口函数中的返回对象(不知道是什么)
 */
let dbQueryAll=(table:string,res:Response,req?:Object,option?:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table].queryAll,(err:any,data:object)=>{
            option?commonRes(res,data,option):commonRes(res,data)
            conn.release()
    })
    })
}
//通过自定义条件查找数据
let dbQueryById=(table:string,key:string,res:Response,req?:Object,option?:Object,other?:object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table][key],req,(err:any,data:object)=>{
            if(other!==undefined){
                option?commonRes(res,{rows:data,...other},option):commonRes(res,{rows:data,...other}) 
            }else{
                option?commonRes(res,data,option):commonRes(res,data)
            }
            conn.release()
    })
    })
}

//封装page类型
let dbQueryByPage=(table:string,key:string,count:string,req:Request,res:Response,)=>{
    let page=(req as any).body.page||1
    let size=(req as any).body.size||8
    let first=(page-1)*size
    let total:any
    if((req as any).body.id){
        db.query(sql[table][count],[(req as any).body.id],(err:any,data:any)=>{
            total=JSON.parse(JSON.stringify(data))[0]
            dbQueryById(table,key,res,[(req as any).body.id,first,size],undefined,total)
        })
        //分类和标签都取的情况
    }else if((req as any).body.sortId&&(req as any).body.labelId){
        db.query(sql[table][count],[(req as any).body.sortId,(req as any).body.labelId],(err:any,data:any)=>{
            total=JSON.parse(JSON.stringify(data))[0]
            dbQueryById(table,key,res,[(req as any).body.sortId,(req as any).body.labelId,first,size],undefined,total)
        })
    }else{
        db.query(sql[table][count],(err:any,data:any)=>{
            total=JSON.parse(JSON.stringify(data))[0]
            dbQueryById(table,key,res,[first,size],undefined,total)
        })
    }

  }

/*删除指定数据*/
let dbDelById=(table:string,res:Response,req?:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table].delById,req,(err:any,data:object)=>{
            commonRes(res,data)
            conn.release()
    })
    })
}

//修改某条件下的某些内容
let dbUpdateById=(table:string,key:string,res:Response,req:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table][key],req,(err:any,data:object)=>{
            commonRes(res,{...data,message:'修改成功！'})
            conn.release()
    })
    })
}

/*增加数据*/
let dbInsertAll=(table:string,res:Response,req:Object)=>{
    db.getConnection((err:any,conn:any)=>{
        conn.query(sql[table].insertAll,req,(err:any,data:object)=>{
            commonRes(res,{...data,message:'增加成功！'})
            conn.release()
    })
    })
}

module.exports={
    dbQueryAll,
    dbQueryById,
    dbQueryByPage,
    dbDelById,
    dbUpdateById,
    dbInsertAll
    // dbCount
}