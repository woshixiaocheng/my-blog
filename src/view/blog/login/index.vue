<template>
  <div class="main">
    <!-- <video src="@/assets/video/bg.mp4" class="bg" muted loop autoplay></video> -->
    <div class="box">
      <div class="login left" :class="{ loginChange: !isLogin }">
        <div class="title">登录</div>

        <el-form ref="loginForm" :model="formLogin" :rules="loginrules" label-width="80px">
          <el-form-item prop="phone">
            <el-input placeholder="手机号" v-model="formLogin.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password placeholder="密码" v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitLogin(loginForm)" class="button">登录</el-button>
        </el-form>
      </div>
      <!-- 去注册板块 -->
      <div class="goChange right" :class="{ goRegisterChange: !isLogin }">
        <div class="title" style="color:#fff">没有账号？</div>
        <div class="liji">立即注册吧😃</div>
        <el-button type="primary" class="button" style="border:1px solid #fff" @click="goRegister">注册</el-button>
      </div>
      <!-- 去登录板块 -->
      <div class="goChange left goLogin" :class="{ goLoginChange: !isLogin }">
        <div class="title" style="color:#fff">已有账号？</div>
        <div class="liji">立即登录吧😃</div>
        <el-button type="primary" class="button" style="border:1px solid #fff" @click="goLogin">登录</el-button>
      </div>
      <!-- 注册板块 -->
      <div class="register right" :class="{ registerChange: !isLogin }">
        <div class="title">注册</div>

        <el-form ref="registerForm" :model="formRegister" :rules="registerRules" label-width="80px">
          <el-form-item prop="name">
            <el-input placeholder="昵称" v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input placeholder="手机号" v-model="formRegister.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password placeholder="密码" v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input type="password" show-password placeholder="再次输入密码" v-model="formRegister.rePassword"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitRegister(registerForm)" class="button">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" >
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/index'
import { register, getUser } from '@/api/user'
import formatDate from '@/utils/formatDate'
import { Login } from '@/utils/type'
import { ElMessage } from 'element-plus'
import { val } from 'dom7'

const user = userStore()
//注册编程式导航
const $router = useRouter()
//判断目前处于登录状态还是注册状态来实现样式切换
const isLogin = ref(true)

/*登录板块*/
//使用ref定义dom对象
const loginForm = ref<FormInstance>()
//登录存数据的
const formLogin = reactive<Login>({
  phone: '',
  password: '',
})
//判断手机号是否注册
const checkPhoneLogin = async function (rule: any, value: any, callback: any): Promise<any> {
  const result = await getUser()
  console.log(result)
 const data= result.every((item: any) =>item.user_phone!== value)
 console.log(data)
 if(data===false){//有一个值==value说明注册了
    return callback()
 }else{
      return callback(new Error('该手机号未注册！'))
 }
  
}
//规则
const loginrules = reactive({
  phone: [
    { required: true, message: '手机号输入不能为空', trigger: 'blur' }, {
      pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur'
    }, { validator: checkPhoneLogin, trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: 'blur' },
  ]
})
//登录提交
const submitLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await user.login(formLogin)
      //登录后跳转主页
        $router.push({
          path: '/'
        })
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
    } else {
      return false
    }
  })
}

//注册板块
const registerForm = ref<FormInstance>()
//登录存数据的
const formRegister = reactive({
  phone: '',
  password: '',
  rePassword: '',
  name: '',
})
//判断手机号是否已注册
const checkPhoneRegister = async (rule: any, value: any, callback: any) => {
  const result = await getUser()
  result.forEach((item: any) => {
    if (item.user_phone === value) {
      return callback(new Error('该手机号已注册！'))
    }
  })
  return callback()
}
//注册规则
const registerRules = reactive({
  name: [
    { required: true, message: '昵称输入不能为空', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '手机号输入不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' },
    { validator: checkPhoneRegister, trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: 'blur' },
  ],
  rePassword: [
    { required: true, message: "密码不能为空", trigger: 'blur' },
  ]
})
const submitRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await register({ ...formRegister, createTime: formatDate(Date.now()) })
      ElMessage({
        message: '注册成功！去登录吧~',
        type: 'success',
      })
      goLogin()
    } else {
      return false
    }
  })
}
//去注册
const goRegister = () => {
  isLogin.value = false
}
//去登录
const goLogin = () => {
  isLogin.value = true
} 
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100%;
  object-fit: cover; //让背景视频充满全屏幕
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 740px;
  height: 440px;
  border-radius: 15px;
 
  overflow: hidden;//很关键，移动的出了这个框就看不见了

  //左边的面板的核心代码
  .left {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    padding: 100px 20px 20px 20px;//布局内部内容
    width: 50%;
    height: 440px;
    border-radius: 15px 0 0 15px;
    text-align: center;
    color: #000;
  }

  //右边的面板核心代码
  .right {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    border-radius: 0 15px 15px 0;
    text-align: center;
  }

  //登录详情板块
  .login {
    background-color: #fff;
    opacity: 0.8;
    transition: 0.5s all;
  }

  //登录改变
  .loginChange {
    top: 440px;//登录表单页往下走
  }

  //去注册板块///去登录板块
  .goChange {
    padding: 130px 20px 20px 20px;
    height: 440px;
    background-color: var(--blueGreen);
    opacity: 0.8;
    transition: 0.5s all;

    .liji {
      font-size: 14px;
      color: #fff;
    }
  }

  //去登录
  //绿色版面藏起来
  .goLogin {
    left: 50%;
    z-index: -1;
    opacity: 0;
  }
//出现的时候
  .goLoginChange {
    left: 0;
    z-index: 10;
    opacity: 0.8;
  }

  .goRegisterChange {
    left: 0;
    z-index: -1;
    opacity: 0;
  }


  //注册板块
  .register {
    left: 0;
    padding: 40px 20px 20px 20px;
    background-color: #fff;
    opacity: 0;
    z-index: -1;
    transition: 0.5s all;
  }

  .registerChange {
    left: 50%;
    opacity: 0.8;
  }

  //大标题
  .title {
    margin-bottom: 30px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
  }

  :deep(.el-form) {
    height: 300px;
    width: 100%;
    margin: 0 auto;
    border-radius: 15px;
    text-align: center;
  }

  :deep(.el-form-item__content)  {
    margin-left: 0 !important;
  }

  :deep(.el-input)  {
    height: 40px;
  }

  .button {
    margin-top: 20px;
    width: 126px;
    height: 46px;
    font-size: 16px;
    font-weight: bold;
    background-color: var(--blueGreen);
    border: 0;
    border-radius: 30px;
  }

  .button:hover {
    animation: buttonBig 0.8s ease-in-out;
  }
}

</style>
