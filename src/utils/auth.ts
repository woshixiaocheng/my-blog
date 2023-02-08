//存储用户登录状态
import Cookies from 'js-cookie'

//设置用户token的独一无二的key
const TokenKey='blog-key'
const timeKey='blog-time-key'

//获取指定名称的cookie
export function getToken(){
    return Cookies.get(TokenKey)
}

//添加指定名称的cookie
export function setToken(token:any){
    return Cookies.set(TokenKey,token)
}

//删除token
export function removeToken(){
    return Cookies.remove(TokenKey)
}

//获取时间戳
export function getTimeStamp(){
    return Cookies.get(timeKey)
}

export function removeTimeStamp(){
    return Cookies.remove(timeKey)
}

//设置时间戳
export function setTimeStamp(){
    console.log('11')
    return Cookies.set(timeKey,Date.now().toString())
}