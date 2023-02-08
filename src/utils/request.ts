//配置axios
import  axios from 'axios'
import { Message } from 'element-plus'
import {userStore} from '@/store/index'
let user:any=null
const service=(axios as any).create({
    baseURL:'http://127.0.0.1:3000',
    timeout: 3600,
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
    // 在有token的情况下才能给请求头
    config.headers['Authorization'] = `Bearer ${user.token}`
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