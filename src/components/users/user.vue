<template>
  <div>
    <div class="user">
      <img @click="dialog" style="width:122px;height:122px;border-radius:61px" :src="page==1?vip.idImage:imgUrl" alt="">
      <div>
        <p style="font-size:24px">{{user.name}}</p>
        <p style="font-size:22px;">{{position}}</p>
        <div style="font-size:20px; width:116px;display:flex;justify-content: space-between">
          <p v-if="user.department">{{user.department}}</p>
          <p v-if="user.workNumber">{{user.workNumber}}</p>
        </div>
      </div>
    </div>
    <el-dialog v-if="page==1" width="100px" :visible.sync="dialogVisible" :show-close="false">
      <div class="box">
        <img style="width:122px;height:122px;border-radius:61px;margin:48px auto 10px;display: block" :src="page==1?vip.idImage:imgUrl" alt="">
        <div class="text">
          <p>贵宾：</p><span>{{user.name}}</span>
        </div>
        <div class="text">
          <p>身份：</p><span>{{user.identity}}</span>
        </div>
        <div class="text">
          <p>会员级别：</p><span>{{user.grade.desc}}</span>
        </div>
        <div class="text">
          <p>会员卡号：</p><span>{{user.memberNumber}}</span>
        </div>
        <div class="text">
          <p>上次到访：</p><span>{{vip.visitTime}}</span>
        </div>
        <div class="text">
          <p>其他信息：</p><span>{{user.quarters}}</span>
        </div>
        <div class="text">
          <p>备注：</p><span>{{user.remarks}}</span>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        vip:{},
        imgUrl:"../../images/成功.png"
      }
    },
    created(){
        this.asyncGetVip()
    },
    methods: {
      dialog(){
        this.dialogVisible=true;
      },
      async asyncGetVip(){
        let data = await fetch(`/apis/equipment/memberinfo/${this.user.id}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        });
        this.vip=data.data
      }
    },
    computed:{
      position(){
        if (this.page==1) {
          return "会员"
        }else if (this.page==2) {
          return "员工"
        }else{
          return "黑名单"
        }
      }
    },
    props:["user","page"]
  }

</script>

<style scoped>
.user {
  width: 248px;
  height: 302px;
  background-image: url('../../images/信息卡背景.png');
  box-shadow: #e4e4e4 6px 6px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 46px;
  color: #333333;
}
.user > div {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.user p {
  text-align: center;
}
.box {
  position: absolute;
  left: -10px;
  top: 0;
  width: 334px;
  height: 478px;
  background-image: url('../../images/员工信息背景-大.png');
}

.text {
  line-height: 35px;
  font-size: 20px;
  color: #666666;
  display: flex;
}

.text p {
  width: 128px;
  text-align: right;
}

.text span {
  margin-left: 20px;
}
</style>
