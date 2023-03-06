// 权限拦截在路由跳转 导航守卫
import router from './router'
import {userStore} from './store'
import { ElMessage} from 'element-plus'//提示
let user:any=null
import NProgress from 'nprogress' // 这个是进度条插件
import 'nprogress/nprogress.css' // 进度条插件的样式
// 定义白名单
const whiteList = ['/login','/','/daily','/article','/classify','/articledetail','/me','/message']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
    // console.log(router.getRoutes())
    let userInfo=JSON.parse(localStorage.getItem('userInfo') as string)
    if(user===null){
        user=userStore()//防止在模块还没加载出来时就被使用
    }

  if (user.token) {
    if (to.path === '/login') {
      next('/')
    } else if(to.path==='/admin'){
        //userInfo里没有内容的时候会进来
        //如果没有userInfo存储的时候要登出
        if(localStorage.getItem('userInfo')===null){
          user.logout()
        }else{
	//登录时在本地存info为[]数组即可用length
  if (!userInfo.length) {
    // console.log('2233')
    // 如果没有id这个值 才会调用获取资料的action
    const data= await user.getUserInfo()//data是数组
    let menus=data.map((item:any)=>{
        return item.permission_name
    })
    //如果得到的值为0，说明没有这个权限
    if(JSON.stringify(data)==='[]'){
      if(router.hasRoute('tempRoute')){
        router.removeRoute('tempRoute')
      }
        ElMessage({
            message: '您没有访问的权限！',
            type: 'error',
          })
        next('/login')
    }else{
        const routes = await user.filterRoutes(menus)
        // addRoutes后必须使用next(to.ptah)
        if(router.hasRoute('tempRoute')){
          router.removeRoute('tempRoute')
        }
        routes.forEach((item:any)=>{
            router.addRoute(item)
        })
      
        next(to.fullPath)
    }
  }else{
//如果有userInfo了就直接admin放行
next()   
  }
        }
		
          
    }else{
        // console.log('2')
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
  NProgress.done() // 关闭进度条
})

