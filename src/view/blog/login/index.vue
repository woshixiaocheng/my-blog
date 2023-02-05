<template>
  <div>
     <video src="@/assets/video/bg.mp4" class="bg"  muted="muted" loop="loop" autoplay="autoplay"></video> 
      <div class="main">
      <div class="login left" :class="{loginChange:!login}">
         <div class="title">登录</div> 
  
      <el-form ref="loginForm" :model="formLogin" :rules="loginrules" label-width="80px">
    <el-form-item prop="phone">
      <el-input placeholder="手机号" v-model="formLogin.phone"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" show-password placeholder="密码"
      v-model="formLogin.password"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitButton" class="button">登录</el-button>
      </el-form>
      </div>
      <!-- 去注册板块 -->
      <div class="goChange right" :class="{goRegisterChange:!login}">
        <div class="title" style="color:#fff">没有账号？</div>
        <div class="liji">立即注册吧😃</div>
        <el-button type="primary" class="button" style="border:1px solid #fff" @click="goRegister">注册</el-button>
      </div>
      <!-- 去登录板块 -->
      <div class="goChange left goLogin" :class="{goLoginChange:!login}">
        <div class="title" style="color:#fff">已有账号？</div>
        <div class="liji">立即登录吧😃</div>
        <el-button type="primary" class="button" style="border:1px solid #fff" @click="goLogin">登录</el-button>
      </div>
      <!-- 注册板块 -->
      <div class="register right" :class="{registerChange:!login}">
        <div class="title">注册</div> 
  
      <el-form ref="registerForm" :model="formRegister" :rules="registerRules" label-width="80px">
      <el-form-item prop="name">
      <el-input placeholder="昵称" v-model="formRegister.name"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input placeholder="手机号" v-model="formRegister.phone"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" show-password placeholder="密码"
      v-model="formRegister.password"></el-input>
    </el-form-item>
     <el-form-item prop="rePassword">
      <el-input type="password" show-password placeholder="再次输入密码" v-model="formRegister.rePassword"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitRegister" class="button">注册</el-button>
      </el-form>
      </div>
      </div>
      </div>
  </template>
  <script setup lang="ts" >
  import {reactive,ref} from 'vue'
  // 引入登录验证接口
  import {useRouter} from 'vue-router'
  // import {useStore} from 'vuex'
  import {register,getUser} from '@/api/user'
  import formatDate from '@/utils/formatDate'
        //判断目前处于登录状态还是注册状态
        const login=ref(true)
       const {dispatch}=useStore()
      //注册编程式导航
      const $router=useRouter()
  
      //登录板块
             //使用ref定义dom对象
      const loginForm=ref(null)
          //登录存数据的
      const formLogin =reactive({
       phone: '',
       password: '',
      })
      const loginrules=reactive({
      phone:[
      {required:true,message:'手机号输入不能为空',trigger:'blur'},
      ],
      password:[
      {required:true,message:"密码不能为空",trigger:'blur'},
      ]
      })
      const submitButton=()=>{
      loginForm.value.validate( async(valid)=>{
          if(valid){
              console.log("通过")
             
            const {data}= await dispatch("login",formLogin)
            console.log(data)
            if(data.bool){
              $router.push({
                path:'/'
              })
            }
          }else{
              console.log("未通过")
          }
      })  
  }
  
      //注册板块
      const registerForm=ref(null)
          //登录存数据的
      const formRegister =reactive({
       phone: '',
       password: '',
       rePassword:'',
       name:'',
      })
      const checkPhone=async(rule,value,callback)=>{
        const {data}=await getUser()
        data.forEach(item=>{
          if(item.user_phone===value){
            return callback(new Error('该手机号已注册！'))
          }
        })
        return callback()
          }
      const registerRules=reactive({
      name:[
      {required:true,message:'昵称输入不能为空',trigger:'blur'},
      ],
      phone:[
      {required:true,message:'手机号输入不能为空',trigger:'blur'},
      {pattern:/^1[3-9]\d{9}$/,message:'请输入正确手机号',trigger:'blur'},
      {validator:checkPhone,trigger:'blur'}
      ],
      password:[
      {required:true,message:"密码不能为空",trigger:'blur'},
      ],
      rePassword:[
      {required:true,message:"密码不能为空",trigger:'blur'},
      ]
      })
      const submitRegister=()=>{
      registerForm.value.validate( async(valid)=>{
          if(valid){
              console.log("通过")
             
            const {data}= await register({...formRegister,createTime:formatDate(Date.now())})
            console.log(data)
          }else{
              console.log("未通过")
          }
      })  
  }
      //去注册
      const goRegister=()=>{
        login.value=false
      }
      //去登录
      const goLogin=()=>{
        login.value=true
      } 
  </script>
  
  <style scoped lang="less">
  .bg{
          width: 100%;
          height: 100%;
          object-fit: cover;//保持原有尺寸比例但部分可能被裁剪
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
      }
  .main{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 740px;
    height: 440px;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
  
    //左边的面板的核心代码
    .left{
      position: absolute;
      top: 0;
      left: 0;
      padding: 100px 20px 20px 20px;
      width: 330px;
      height: 320px;
      border-radius: 15px 0 0 15px ;
      text-align: center;
    }
    //右边的面板核心代码
    .right{
      position: absolute;
      top: 0;  
      left:370px; 
      width: 330px;
      border-radius: 0 15px 15px 0;
      text-align: center;
    }
    //登录详情板块
    .login{
      background-color: #fff;
      opacity: 0.8;
      transition: 0.5s all;
    }
    //登录改变
    .loginChange{
      top: 440px;
    }
    //去注册板块///去登录板块
    .goChange{
      padding: 130px 20px 20px 20px;
      height: 290px;
      background-color: var(--blueGreen);
      opacity: 0.8;
      transition: 0.5s all;
      .liji{
        font-size: 14px;
        color: #fff;
      }
    }
    //去登录
    .goLogin{
      left: 370px;
      z-index:-1;
      opacity: 0;
    }
    .goLoginChange{
    left: 0;
  z-index:10;
  opacity: 0.8;
    }
    .goRegisterChange{
      left: 0;
      z-index: -1;
      opacity: 0;
    }
    
  
    //注册板块
    .register{
      left: 0;
      padding: 40px 20px 20px 20px;
      height:380px;
      background-color: #fff;
      opacity: 0;
      z-index: -1;
      transition: 0.5s all;
    }
    .registerChange{
      left: 370px;
      opacity: 0.8;
    }
    //大标题
    .title{
        margin-bottom: 30px;
        font-size: 30px;
        text-align: center;
        font-weight: bold;
      }
  
  /deep/.el-form{
  height: 300px;
      width: 100%;
      margin: 0 auto;
      border-radius:15px;
      text-align: center;
      }
    /deep/ .el-form-item__content{
      margin-left: 0 !important;
    }
    /deep/ .el-input{
      height: 40px;
    }
    .button{
      margin-top: 20px;
      width: 126px;
      height: 46px;
      font-size: 16px;
      font-weight: bold;
      background-color: var(--blueGreen);
      border: 0;
      border-radius:30px ;
    }  
    .button:hover{
      animation: buttonBig 0.8s ease-in-out;
    }
  
  }
  </style>
  