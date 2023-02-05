//统一返回规范
import {Response} from 'express'
import {Code,codeType,CodeMessage} from '../constant/code'

//定义一个返回类型,都为可选的
interface ResOption{
    type?:codeType
    status?:number,
    message?:unknown//代表任何值，但是对他做任何事情都不合法
}
//默认正确响应
//其中options可选
function commonRes(res:Response,data:unknown,options?:ResOption){
    //默认成功，成功时就不需要传入options
    //Object.assign()方法是把所有可枚举属性的值赋值到目标对象，目标对象是第一个参数，如果有重复的会覆盖目标对象里面的
    options=Object.assign({type:Code[200]},options||{})

    const {type,status,message}=options
    let resStatus=status||undefined
    if(resStatus===undefined){
        //根据状态设置状态码
        resStatus=type===Code[200]?200:409
    }

    //规范响应参数
    const sendRes:{code:number,data:unknown,message?:unknown}={
        code:Code[type as codeType],
        data
    }
    //响应描述
    //先判断是否有再赋值
    message&&(sendRes.message=message)

    return res.status(resStatus).send(sendRes)
}
commonRes.error=function(res:Response,data: unknown, message?: unknown, status?: number){
    this(res,data,{type:'serverError',message:CodeMessage['serverError'],status:status||409})
}

export default commonRes