<template>
  <div class="login">
    <div class="container">
      <img class="avatar" src="../assets/avatar.jpg">
      <!-- rules 验证规则 -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="icon-user" @focus="handleValidate('username')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="icon-key" @focus="handleValidate('password')" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="handleLogin">登陆</el-button>
      </el-form>  
    </div>
  </div>
</template>

<script>
import {login} from '@/apis/use'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // clearValidate 移除表单项的校验结果
    // 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
    handleValidate(propsValue){
      this.$refs.loginForm.clearValidate(propsValue)
    },
    handleLogin(){
      // validate 对整个表单进行校验 
      // 先进行用户输入的验证--二次验证，只有通过验证才会进行登陆的提交
      this.$refs.loginForm.validate(async(valid,obj)=>{
        console.log(valid);
        if(valid){
          let res = await login(this.loginForm)
          console.log(res);
          if(res.data.statusCode===401){
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          }else{
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            localStorage.setItem('toutiao_back_token',res.data.data.token)
            localStorage.setItem('toutiao_back_userId',res.data.data.user.id)
            this.$router.push({name:'index'})
          }
        }else{
          this.$message({
              message: '输入不合法',
              type: 'warning'
          });
          return false
        }
      })
    },

  }
};
</script>

<style lang="less" scoped>
  .login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>