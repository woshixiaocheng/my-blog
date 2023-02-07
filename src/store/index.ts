import {defineStore} from 'pinia'
import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
import {Login} from '@/utils/type'
import {login} from '@/api/user'
export const userStore=defineStore('user',{
    state:()=>{
        return {
            token:getToken(),
            userInfo:{}
        }
    },
    actions:{
        //登录写在这
    async login(data:Login){
        const {token}=await login(data)
        if(token){
            this.token=token
            setToken(token)
            setTimeStamp()
        }
    },
    }
})
// //存登录


// // 状态
// const state = {
//     token:null,//登录成功后把钥匙存在本地缓存
//     userInfo:{},//定义一个空对象
// }
// // 修改状态
// const mutations = {
//     // 设置state
//     setToken(state,token){
//         state.token=token
//         setToken(token)//设置本地缓存数据同步修改
//     },
//     //删除
//     removeToken(state){
//         state.token=null
//         removeToken()
//     },
// }
// // 执行异步
// const actions = {

//     //登出
//     logout(context){
//         //删除token
//         context.commit('removeToken')

//     }
// }
// export default  createStore({
//   namespaced: true,
//   state,
//   mutations,
//   actions
// })