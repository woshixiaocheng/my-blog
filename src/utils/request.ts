//配置axios
import  axios from 'axios'
import {userStore} from '@/store/index'
import router from '@/router'
//处理超时
import { getTimeStamp } from './auth'
import {ElMessage} from 'element-plus'
const TimeOut=3600//超时时间
//检查超时的函数
function isCheckTimeOut(){
  const curTimeStamp=Date.now()
  return (curTimeStamp-(getTimeStamp() as any))/1000>TimeOut//true即超时了
}
let user:any=null
const service=(axios as any).create({
  baseURL:'http://localhost:3088',
    // baseURL:'http://47.97.125.199:3088',
    timeout: 5000,//获取请求的最大时间，大于5秒就报超时
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
})
//请求拦截器
service.interceptors.request.use((config:any) => {
 
  if(user===null){
    user=userStore()
  }
  if (user.token) {
    //增删改的操作都要检查超时
    if(config.url==='/del/label'||config.url==='/edit/label'||config.url==='/add/label'||config.url==='/edit/label'||config.url==='/edit/sort'||config.url==='/add/sort'||config.url==='/del/sort'||config.url==='/add/sort'||config.url==='/add/article'||config.url==='/edit/article'||config.url==='/edit/articleSort'||config.url==='/edit/articleLabel' ||config.url==='/del/article'||config.url==='/userinfo'||config.url==='/add/daily'||config.url==='/edit/daily'||config.url==='/del/daily'||config.url==='/add/comment'){
       //检查超时
      if(isCheckTimeOut()){
        user.logout()
        router.push('/login')
        ElMessage({
          message: '登录超时！',
          type: 'error',
        })
        return  Promise.reject(new Error('token超时了！'))

      }
      // 在有token的情况下才能给请求头
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
  }
  return config // 必须返回配置
}, (error:any) => {
  return Promise.reject(error)
}) 
//响应拦截器处理返回的data值，扒皮
service.interceptors.response.use((response:any)=>{
  const {code,data,message}=response.data
  if(code===200){
    return data
  }
})
export default service