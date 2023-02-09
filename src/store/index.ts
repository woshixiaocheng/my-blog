import {defineStore} from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import {getToken,setToken,removeToken,setTimeStamp,removeTimeStamp} from '@/utils/auth'
import {Login} from '@/utils/type'
import {login,getUserInfo} from '@/api/user'
import { resetRouter } from '@/router'
interface info{
    permission_id:number
    permission_name:string
    user_id:number
    user_name:string
    user_phone:string
    user_photo:object
}
export const userStore=defineStore('user',{
    state:()=>{
        return {
            token:getToken()||null,
            phone:JSON.parse(localStorage.getItem('userPhone') as string),//缓存本地为了让刷新页面不丢失
            userInfo:JSON.parse(localStorage.getItem('userInfo') as string) ||'1',
            routes: constantRoutes,// 所有人默认有静态路由
                   }
    },
    actions:{
        //登录写在这
    async login(data:Login){
        const {token,phone}=await login(data)
        if(token){
            this.token=token
            setToken(token)
            setTimeStamp()
        }
        this.phone=phone
        localStorage.setItem('userPhone',JSON.stringify(phone) )
        localStorage.setItem('userInfo',JSON.stringify([]))
    },
    //登出
    async logout(){
        removeToken()//删除缓存中的token
        removeTimeStamp()
        this.token=null//删除state中的
        resetRouter()//重置路由
        this.userInfo=null
        this.phone=null
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userPhone')
        

    },
    //获取用户个人信息
    async getUserInfo(){
        const data=await getUserInfo({phone:this.phone})
        let str=JSON.stringify([...data])
        localStorage.setItem('userInfo',str)
        return data
    },
      // 筛选权限路由方法：外部传入权限name和路由的name相对应
    filterRoutes(menus:any) {
    const routes:any[] = []// 存入能和menus对得上的路由
    menus.forEach((key:any) => {
      // key就是menus的值们
      const data = asyncRoutes.filter((item:any) => item.name === key)
      routes.push(...data)
    })
    this.routes=[...constantRoutes,...routes]
    // localStorage.setItem('routes',JSON.stringify(routes) )
    return routes// 这里是为了路由addRoutes
  }
    }
})
export default userStore