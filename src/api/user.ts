import request from '@/utils/request'
//写具体的接口方法
export function login(data:Object){
    return request({
      method:"POST",
      url:"/login",
      data  
    })
}

export function register(data:Object){
  return request({
    method:'POST',
    url:"/register",
    data
  })
}

export function getUser(){
  return request({
    method:'GET',
    url:"/user",
  })
}