<template>
  <div>
    <Header />
    <Nav name="添加人员" />
    <div>
      <ul class="select">
        选择身份：<li>VIP会员</li>
        <li @click="()=>{this.$router.push('/addUser');}">员工</li>
        <li @click="()=>{this.$router.push('/addBlacklist');}">黑名单</li>
      </ul>
    </div>
    <img style="display:block;width:143px;height:143px;border-radius: 71px;margin: 36px auto 26px;" src="../../images/成功.png"
      alt="">
    <div class="form">
      <el-form style="margin-left:-20px;width:495px;" ref="form" label-position="right" label-width="100px">
        <el-form-item label="称呼:">
          <el-input v-model="name" placeholder="请输入称呼（必填）"></el-input>
        </el-form-item>
        <el-form-item label="身份:">
          <el-input v-model="identity" placeholder="请输入身份"></el-input>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="grade" placeholder="请选择会员等级" style="width:395px">
            <el-option v-for="(item, index) in grades" :key="index" :label="item.desc" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员卡号:">
          <el-input v-model="memberNumber" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="telephone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="生日:">
          <el-date-picker v-model="birthday" type="date" style="width:100%" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="小区:">
          <el-input v-model="quarters" placeholder="请输入小区"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="remarks" type="textarea" rows="4" placeholder="请输入备注">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" style="width:370px;height:58px;border-radius: 10px;background-color: #fdad17;font-size:26px;margin:32px 0 34px"
            type="warning">提交</el-button>
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
        name: "",
        identity: "",
        grade: "",
        memberNumber: "",
        telephone: "",
        birthday: "",
        quarters: "",
        remarks: "",
        grades:[]
      }
    },
    created() {
      this.asyncGetGrade();
    },
    methods: {
      // 提交
      submit() {
        this.addVip(this);
      },
      getGrade(data){
        this.grades=data;
      },
      ...mapActions("users", ["addVip"]),
      // 获取会员等级
      async asyncGetGrade() {
        let data = await fetch(`/apis/equipment/member/grades`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        });
        this.getGrade(data.data);
      }
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
  .select li:nth-child(1) {
    color: #fff;
    background-color: #fdad17;
  }

  .form {
    width: 495px;
    margin: auto;
  }
</style>