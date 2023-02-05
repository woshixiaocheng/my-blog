// //添加数据
// let db=require('../db/index')
// exports.add=(req,res)=>{
//     var sql='select *from article where id=?'//?用于占位，这里要外界传入
//     db.query(sql,[req.query.id],(err,data)=>{//对数据库进行操作，第一个参数为操作语句，第二个是传入数据用[]包括，然后是回调函数返回数据或错误
//         if(err){
//             return res.send(err.message)
//         }
//         res.send(data)//send把数据响应给客户端
//     })
// }
export{}