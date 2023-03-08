//管理页面路由
import {createRouter,createWebHistory,RouteRecordRaw}from 'vue-router'//引入要使用的方法

//引入要和路由关联的组件们
import Layout from '@/view/blog/layout/index.vue'

//路由规则
export const constantRoutes:RouteRecordRaw[]=[
    //静态路由是都可以访问的内容(博客网页的全部)
    //博客部分
    //布局
     { 
        path: '/',
        component: Layout,
        redirect: '',
        name:'layout',
        children:[
        //登录注册
        {
            path:'login',
            name:'login',
            component:()=>import('@/view/blog/login/index.vue'),
        },
         //首页
         {
        path:'',
        name:'main',
        component:()=>import('@/view/blog/main/index.vue')
         },
         {
            path:'classify',
            name:'classify',
            component:()=>import('@/view/blog/classify/index.vue'),
         },
         
    // 文章
    {
        path:'article',
        name:'article',
        component:()=>import('@/view/blog/article/index.vue'),
     },
     //文章详情
     {
        path:'articledetail',
        name:'articledetail',
        component:()=>import('@/view/blog/article-detail/index.vue'),
     },

    //日记
    {
        path:'daily',
        name:'daily',
        component:()=>import('@/view/blog/daily/index.vue')
    },
    //关于我
    {
        path:'me',
        name:'me',
        component:()=>import('@/view/blog/me/index.vue')
    },
    {
        path:'message',
        name:'message',
        component:()=>import('@/view/blog/message/index.vue')
    }
        ]
        }
]

//动态路由，主要是后台管理系统
export const asyncRoutes:RouteRecordRaw[]=[
{
    path:'/admin',
    name:'管理',
    // redirect:'/admin',
    component:()=>import( '../view/admin/layout/index.vue'),
    children:[{
        path:'sort',
        name:'sort',
        component:()=>import('../view/admin/sort/index.vue')
    },{
        path:'label',
        name:'label',
        component:()=>import('../view/admin/label/index.vue')
    },{
        path:'article',
        name:'adminArticle',
        component:()=>import('../view/admin/article/index.vue')
    },
    {
        path:'doArticle',
        name:'adminDoArticle',
        component:()=>import('../view/admin/article/detail.vue'),
        // meta: {
        //     keepAlive: true
        // }
    },
    {
        path:'admindaily',
        name:'adminDaily',
        component:()=>import('../view/admin/daily/index.vue')
    }
]
}
]
// {
//     path:'user',
//     name:'user',
//     component:()=>import('../view/admin/user/index.vue')
// },
//生成路由对象，写法和vue2不同的是，vue2用的是 new VueROUter，引入也是vueRouter
const router=createRouter({
    history:createWebHistory(),//用这个来配置路由模式
   routes:[...constantRoutes]//这里的routes是不能改变的！！！,上面定义的路由是用这种方式引入的
})
// 重置路由
export function resetRouter() {
    const newRouter:any = createRouter({
        history:createWebHistory(),//用这个来配置路由模式
       routes:[...constantRoutes]//这里的routes是不能改变的！！！,上面定义的路由是用这种方式引入的
    })
    router.resolve = newRouter.resolve // reset router

  }
router.afterEach(()=>{
    window.scrollTo(0,0)//跳转后自动返回页面顶部
})

if(!router.hasRoute('tempRoute')){
router.addRoute({
    path:'/admin',
    name:'tempRoute',
    component:()=>import( '../view/admin/layout/index.vue'),
    children:[{
        path:'sort',
        name:'sort',
        component:()=>import('../view/admin/sort/index.vue')
    },{
        path:'label',
        name:'label',
        component:()=>import('../view/admin/label/index.vue')
    },
    {
        path:'admindaily',
        name:'adminDaily',
        component:()=>import('@/view/admin/daily/index.vue')
    },
    {
        path:'article',
        name:'adminArticle',
        component:()=>import('../view/admin/article/index.vue')
    },
    {
        path:'doArticle',
        name:'adminDoArticle',
        component:()=>import('../view/admin/article/detail.vue'),
        meta: {
            keepAlive: true
        }
    },
]
})
}
export default router

