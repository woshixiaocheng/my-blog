//配置服务器相关信息
let express =require('express')
let app=express()
let cors=require('cors')//处理跨域问题
let bodyParser = require('body-parser')//解析中间件为了能用到res.body
let router=require('./router')
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(cors())
app.use(router)//配置路由
//指定端口号并启动服务器
app.listen(3000,()=>{
console.log('run111')
})
export{}