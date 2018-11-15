<template>
  <div class="login">
    <div class="content">
      
      <h2>会员智能管理系统</h2>
      <div class="text">
        <input v-model="name" type="text" placeholder="请输入手机号">
      </div>
      <div class="text verify">
        <input v-model="verify" type="text" placeholder="请输入验证码">
         <el-button style="width:116px;height:42px;" type="primary">获取验证码</el-button>
      </div>
      <div class="text">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <input @click="login" class="button" type="button" value="注册">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          name : '',
          password:'',
          verify:''
      }
    },
    methods:{
      // 登录回调
      login(){
        console.log(this.name,this.password)
        // this.$router.push('/users')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  min-width: 800px;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: url('../../images/loginbg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.content {
  width: 568px;
  height: 523px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content > h2 {
  margin: 30px 0 60px;
  font-size: 30px;
  color: #2f8dfe;
  font-weight: 400;
}
.text {
  width: 480px;
  border-bottom: 2px solid #cccccc;
  margin-bottom: 5px;
}
.text > input {
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
  border: 0;
  outline: none;
  color: #999999;
  padding: 20px 0;
}
.content > .verify {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content > .verify > inptu {
  width: 340px;
}
.content > .button {
  width: 370px;
  height: 56px;
  border-radius: 10px;
  outline: none;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  background-color: #fdad17;
  font-size: 26px;
  margin-top: 43px;
}
/* 兼容不同浏览器输入框的默认样式 */
.text > input::-webkit-input-placeholder {
  color: #999999;
}
.text > input:-moz-placeholder {
  color: #999999;
}
.text > input::-moz-placeholder {
  color: #999999;
}
.text > input:-ms-input-placeholder {
  color: #999999;
}
</style>
