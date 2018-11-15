<template>
  <div>
    <Header />
    <Nav name="记录报表" />
    <div class="nav">
      <ul>
        <li @click="page=1" :class="page==1?'link':''">考勤管理</li>
        <li @click="page=2" :class="page==2?'link':''">数据统计</li>
      </ul>
      <div class="operation">
        <div class="search">
          <input type="text" placeholder="请输入名称/手机号/小区">
          <p>搜索</p>
        </div>
        <div class="i-button">考勤设置</div>
      </div>
    </div>
    <div v-if="page==1" class="table">
      <el-table :data="members" :row-style="{'height':'64px','font-size':'20px'}" :header-cell-style="{'background-color': '#ebebeb','color':'#333333','height':'64px','font-size':'20px'}" max-height="580">
        <el-table-column prop="shopName" label="店铺名称" align="center" width="250">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="251">
        </el-table-column>
        <el-table-column prop="statrTime" label="打卡时间" align="center" width="251">
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="250">
        </el-table-column>
      </el-table>
    </div>
    <div v-show="page==2" class="table">
      <el-table :data="statistics" :row-style="{'height':'64px','font-size':'20px'}" :header-cell-style="{'background-color': '#ebebeb','color':'#333333','height':'64px','font-size':'20px'}" max-height="580">
        <el-table-column type="index" label="序号" align="center" width="250">
        </el-table-column>
        <el-table-column prop="name" label="今日客流量" align="center" width="251">
        </el-table-column>
        <el-table-column prop="statrTime" label="本周客流量" align="center" width="251">
        </el-table-column>
        <el-table-column prop="state" label="本月客流量" align="center" width="250">
        </el-table-column>
      </el-table>
    </div>
    <Footer />
  </div>

</template>

<script>
  export default {
    data() {
      return {
        members: [],
        statistics:[{
          name:'今日流量',
          statrTime:'500',
          state:'100'
        }],
        page:1
      }
    },
      created() {
      this.asybcGetMembers();
    },
    methods: {
      async asybcGetMembers() {
        let data = await fetch(`/apis/equipment/attendance/list?shopId=${window.localStorage.storeId}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        })
        this.members=data.data.rows;
        for(let i in this.members){
          this.members[i].state==1? this.members[i].state="已打卡": this.members[i].state="未打卡"
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  width: 1202px;
  margin: auto;
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
.nav .link,
.nav > ul > li:hover {
  background-color: #fdad17;
  color: #fff;
}
.operation {
  display: flex;
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
  cursor: pointer;
  width: 106px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  background-color: #fdad17;
  color: #fff;
  font-size: 20px;
  margin-left: 30px;
}
.table {
  width: 1002px;
  min-height: 580px;
  margin: 35px auto 105px;
  text-align: center;
}
</style>