// 权限拦截在路由跳转 导航守卫
import router from './router'
import {userStore} from './store'
import { ElMessage} from 'element-plus'
let user:any=null
// import NProgress from 'nprogress' // 这个是进度条插件
// import 'nprogress/nprogress.css' // 进度条插件的样式
// 定义白名单
const whiteList = ['/login','/']
router.beforeEach(async(to, from, next) => {
    // if(localStorage.getItem('routes')){
    //     let routes=JSON.parse(localStorage.getItem('routes')as string)
    //     routes.forEach((item:any)=>{
    //         router.addRoute(item)
    //     })
        
    // }
    console.log(router.getRoutes())
    let userInfo=JSON.parse(localStorage.getItem('userInfo') as string)
    if(user===null){
        user=userStore()
    }
//   NProgress.start()
  if (user.token) {
    if (to.path === '/login') {
        console.log('1')
      next('/')
    } else if(to.path==='/admin'){
        //userInfo里没有内容的时候会进来
    
      if (!userInfo.length) {
        console.log('2233')
        // 如果没有id这个值 才会调用获取资料的action
        const data= await user.getUserInfo()//data是数组
        let menus=data.map((item:any)=>{
            return item.permission_name
        })
        //如果得到的值为0，说明没有这个权限
        if(JSON.stringify(data)==='[]'){
            ElMessage({
                message: '您没有访问的权限！',
                type: 'info',
              })
            next('/login')
        }else{
            const routes = await user.filterRoutes(menus)
            // addRoutes后必须使用next(to.ptah)
            routes.forEach((item:any)=>{
                router.addRoute(item)
            })
            // router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
            // console.log(next(to.fullPath))
            // next(to.fullPath)
            next({ ...to, replace: true })
            if(router.hasRoute('tempRoute')){
                router.removeRoute('tempRoute')
            }
            next({ path:to.path, replace: true })
        }
      }
        //如果有userInfo了就直接admin放行
        console.log('33')
        
        next()     
    }else{
        console.log('2')
        next()//调用'/的时候'
    }
    
  } else {
    if (whiteList.indexOf(to.path) === -1) {
      next('/login')
    } else {
      next()
    }
  }
//   NProgress.done()
})
// 后置守卫
router.afterEach(function() {
//   NProgress.done() // 关闭进度条
})

