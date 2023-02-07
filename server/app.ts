//配置服务器相关信息
let express =require('express')
let app=express()
let  { expressjwt } = require("express-jwt");
let cors=require('cors')//处理跨域问题
let bodyParser = require('body-parser')//解析中间件为了能用到res.body
let router=require('./router')
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
export const signStr='lalala'//密钥
//把解析出来的用户信息，挂载到 `req.user` 属性上
app.use(
    expressjwt({ secret: signStr, algorithms: ["HS256"] }).unless({
      //不想要带请求头请求的都放这
      path: ['/article','/article/assign','/sort/article','/label/article','/sort','/article/sort','/label','/article/label','/daily','/login','/user','/register','/article/page','/article/sortByPage','/article/labelByPage','/article/SLByPage','/del/article','/edit/articleLabel','/edit/articleSort','/edit/article','/add/article'],
    })
  );
app.use(cors())
app.use(router)//配置路由
//指定端口号并启动服务器
app.listen(3000,()=>{
console.log('run111')
})
export{}