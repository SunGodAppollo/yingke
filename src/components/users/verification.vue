<template>
  <div>
    <Header />
    <Nav name="会员验证" />
    <div class="search">
      <div>
        手机号：<el-input class="input" placeholder="请输入手机号"></el-input>
      </div>
      <div style="margin:0 80px 0 50px">
        会员卡号：<el-input class="input" placeholder="请输入会员卡号"></el-input>
      </div>
      <el-button style="font-size:18px;width:138px;height:40px;background-color:#fdad17;border-radius: 10px;" type="primary">确定</el-button>
    </div>
    <div class="table">
      <el-table :data="members" :header-cell-style="{'background-color': '#ebebeb','color':'#333333'}" max-height="580">
        <el-table-column type="index" label="排序" align="center" width="250">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center" width="251">
        </el-table-column>
        <el-table-column prop="memberNumber" label="会员卡" align="center" width="251">
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <img @click="ifRemove(scope.$index)" style="cursor: pointer;" src="../../images/删除.png" alt="">
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 提示框 -->
    <el-dialog title="提示" :visible.sync="isDelete" width="30%" center>
      <p style="color:#333333;font-size:20px;text-align:center;">是否删除此会员？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="asyncRemove">确 定</el-button>
        <el-button @click="isDelete = false">取 消</el-button>
      </span>
    </el-dialog>
    <Footer />
  </div>

</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  export default {
    data() {
      return {
        isDelete: false,
        members: [],
        memberId: ""
      }
    },
    created() {
      this.asyncGetVip()
    },
    computed: {
      ...mapState("users", ["storeId"]),   //获取当前账号的店铺id
    },
    methods: {
      ifRemove(index) {   //判断是否删除
        this.isDelete = true;
        this.memberId = this.members[index].id
      },
      async asyncRemove() {  //确认删除
        let data = await fetch(`/apis/equipment/member/del/${window.localStorage.storeId}?memberId=${this.memberId}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        })
        this.isDelete = false;
        this.asyncGetVip();
      },
    async asyncGetVip() {  //获取所有的会员
      let data = await fetch(`/apis/equipment/member/list?shopId=${window.localStorage.storeId}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      this.members = data.data.rows;
    },
  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search {
    width: 1202px;
    margin: auto;
    display: flex;
    font-size: 22px;
    color: #333333;
  }

  .input {
    width: 290px;
    font-size: 18px;
  }

  .table {
    width: 1002px;
    margin: 35px auto 105px;
    text-align: center;
  }
</style>