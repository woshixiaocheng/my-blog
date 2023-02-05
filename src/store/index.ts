import {defineStore} from 'pinia'
export const user=defineStore('user',{
    state:()=>{
        return {
            token:null,
        }
    }
})
// //存登录
// import {createStore} from 'vuex'
// import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
// import {login} from '@/api/user'
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
//     //登录
//     async login(context,data){
//         const result=await login(data)
//         if(result.data.bool){
//             context.commit('setToken',result.data.result)
//         setTimeStamp()
//         }
        
//         return result
//     },
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