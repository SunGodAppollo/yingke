<template>
  <div>
    <Header></Header>
    <div style="width:1202px;margin:auto;">
      <Nav name="会员管理"></Nav>
      <div class="nav">
        <ul>
          <li @click="page=1;currentPage=1" :class="page==1?'link':''">VIP会员</li>
          <li @click="page=2;currentPage=1" :class="page==2?'link':''">员工</li>
          <li @click="page=3;currentPage=1" :class="page==3?'link':''">黑名单</li>
        </ul>
        <div class="operation">
          <div class="search">
            <input v-model="queryText" type="text" placeholder="请输入名称/手机号/小区">
            <p @click="search">搜索</p>
          </div>
          <div style="cursor: pointer;" @click="open" class="i-button add-button">添加</div>
          <div style="cursor: pointer;" @click="()=>{this.$router.push('/verification');}" class="i-button">会员验证</div>
        </div>
      </div>
      <ul class="ul" v-for="index in 3" :key="index" v-if="page==index">
        <li v-for="(item, index) in users.vipUsers.rows" v-if="page==1" :key="index">
          <User :user="item" :page="page" />
        </li>
        <li v-for="(item, index) in users.staff.rows" v-if="page==2" :key="index">
          <User :user="item" :page="page" />
        </li>
        <li v-for="(item, index) in users.black.rows" v-if="page==3" :key="index">
          <User :user="item" :page="page" />
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <div v-if="ifData" style="min-width: 1202px;;display:flex;justify-content:center;margin:56px 0;">
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" layout=" prev, pager, next, jumper" :page-count="pageCount" :page-size="pageSize">
      </el-pagination>
    </div>
    <div v-else style="width:1202px;text-align: center;height: 548px;line-height: 548px;font-size: 48px;color: #dbdbdb;margin:auto">
      暂无数据
    </div>
    <Footer />
  </div>

</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  export default {
    name: "users",
    data() {
      return {
        page: 1,
        currentPage: 1,  //当前页
        pageSize: 12,    //每页显示条数
        queryText:"" //查询文本
      }
    },
    mounted() {

    },
    computed: {
      // ...mapState("users", ["storeId"]),   //获取当前账号的店铺id
      ...mapState("store", ["users"]),   //获取员工分页的列表
      pageCount() {  //总页数，根据当前总条数除去当前页显示条数得到
        if (this.page == 1) {
          return Math.ceil(this.users.vipUsers.total / this.pageSize)
        } else if (this.page == 2) {
          return Math.ceil(this.users.staff.total / this.pageSize)
        } else {
          return Math.ceil(this.users.black.total / this.pageSize)
        }

      },
      ifData(){
        if (this.page == 1) {
          return this.users.vipUsers.rows&&this.users.vipUsers.rows.length>0?true:false;
        } else if (this.page == 2) {
          return this.users.staff.rows&&this.users.staff.rows.length>0?true:false;
        } else {
          return this.users.black.rows&&this.users.black.rows.length>0?true:false;
        }
      }
    },
    created() {
      //获取会员列表分页
      this.asyncGetVip({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
      //获取员工列表分页
      this.asyncGetStore({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
      //获取黑名单
      this.asyncGetBlack({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
      console.log(this.users)
    },
    methods: {
      handleCurrentChange(val) {  //当前页发生跳转时调用，val表示当前页
        this.currentPage = val;   //更新当前页
        if (this.page == 1) {
          this.asyncGetVip({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
        } else if (this.page == 2) {
          this.asyncGetStore({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
        } else {
          this.asyncGetBlack({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize });
        }
      },
      open() {  //点击添加时，根据当前所在页面打开对应的添加页面；
        if (this.page == "2") {
          this.$router.push('/addUser');
        } else if (this.page == "3") {
          this.$router.push('/addBlacklist');
        } else {
          this.$router.push('/addVip');
        }
      },
      search() { //点击搜索按钮进行搜索
        if (this.page == 1) {
          this.asyncGetVip({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize, queryText:this.queryText });
        } else if (this.page == 2) {
          this.asyncGetStore({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize ,queryText:this.queryText});
        } else {
          this.asyncGetBlack({ shopId: window.localStorage.storeId, pageNumber: this.currentPage, pageSize: this.pageSize ,queryText:this.queryText});
        }
      },
      ...mapActions("store", ["asyncGetVip", "asyncGetStore", 'asyncGetBlack'])
    }
  }

</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.nav > ul {
  display: flex;
  list-style: none;
  color: #666666;
}

.nav > ul > li {
  width: 129px;
  box-sizing: border-box;
  border: 2px solid #fdad17;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  cursor: pointer;
}

.nav > ul > li:nth-child(2) {
  border-left: 0;
  border-right: 0;
}

.link,
.nav > ul > li:hover {
  background-color: #fdad17;
  color: #fff;
}

.operation {
  display: flex;
  width: 620px;
  height: 40px;
  box-sizing: border-box;
}

.search {
  width: 368px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  border: 2px solid #e6e6e6;
}

.search > input {
  width: 296px;
  padding: 9px;
  outline: none;
  border: 0;
  font-size: 20px;
}

.search > input::-webkit-input-placeholder {
  color: #e6e6e6;
}

.search > p {
  width: 72px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  cursor: pointer;
  background-color: #fdad17;
}

.i-button {
  width: 106px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  background-color: #fdad17;
  color: #fff;
  font-size: 20px;
}

.add-button {
  margin: 0 10px 0 28px;
}

.ul {
  width: 1184px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 35px;
  margin-left: 33px;
}

.ul > li {
  list-style: none;
  margin-bottom: 26px;
  margin-right: 48px;
}
</style>