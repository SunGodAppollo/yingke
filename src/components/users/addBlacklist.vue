<template>
  <div>
    <Header />
    <Nav name="添加人员" />
    <div>
      <ul class="select">
        选择身份：<li @click="()=>{this.$router.push('/addVip');}">VIP会员</li>
        <li @click="()=>{this.$router.push('/addUser');}">员工</li>
        <li>黑名单</li>
      </ul>
    </div>
    <img style="display:block;width:143px;height:143px;border-radius: 71px;margin: 36px auto 26px;" src="../../images/成功.png" alt="">
    <div class="form">
      <el-form style="margin-left:-20px;width:495px;" ref="form" label-position="right" label-width="100px">
        <el-form-item label="称呼:">
          <el-input v-model="name" placeholder="请输入称呼（必填）"></el-input>
        </el-form-item>
        <el-form-item label="身份:">
          <el-input v-model="identity" placeholder="请输入身份（如小偷、医闹；必填）"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="remarks" type="textarea" rows="4" placeholder="请输入备注">
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="addBlacklist" style="width:370px;height:58px;border-radius: 10px;background-color: #fdad17;font-size:26px;margin:104px 0 104px" type="warning">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
  export default {
    data() {
      return {
        name:"",
        identity:"",
        remarks:""
      }
    },
    methods:{
      addBlacklist(){
        this.asyncAddBlacklist(this)
      },
      ...mapActions("users", ["asyncAddBlacklist"]),
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  display: flex;
  justify-content: space-between;
  width: 532px;
  margin: auto;
  font-size: 22px;
  line-height: 40px;
  color: #333333;
}
li {
  list-style: none;
}
.select li {
  width: 130px;
  height: 40px;
  color: #666666;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  border: 2px solid #fdad17;
  cursor: pointer;
}
.select li:hover,
.select li:nth-child(3) {
  color: #fff;
  background-color: #fdad17;
}
.form {
  width: 495px;
  margin: auto;
}
</style>
