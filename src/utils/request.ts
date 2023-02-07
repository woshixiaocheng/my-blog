//配置axios
import  axios from 'axios'
import { Message } from 'element-plus'
const service=(axios as any).create({
    baseURL:'http://127.0.0.1:3000',
    timeout: 3600,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
})
//响应拦截器处理返回的data值，扒皮
service.interceptors.response.use((response:any)=>{
  const {code,data,message}=response.data
  if(code===200){
    return data
  }
})
export default service