<template>
  <div>
    <Header />
    <ul class="nav">
      <li>
        <img src="../../images/设置向导.png" alt="">
        <p>设置向导</p>
      </li>
      <li>
        <img @click="()=>{this.$router.push('/users');}" src="../../images/会员管理.png" alt="">
        <p>会员管理</p>
      </li>
      <li>
        <img @click="()=>{this.$router.push('/statement');}" src="../../images/记录报表.png" alt="">
        <p>记录报表</p>
      </li>
      <li>
        <img src="../../images/多媒体.png" alt="">
        <p>多媒体</p>
      </li>
      <li>
        <img src="../../images/系统信息.png" alt="">
        <p>系统信息</p>
      </li>
      <li>
        <img @click="()=>{this.$router.push('/brand');}" src="../../images/品牌信息.png" alt="">
        <p>品牌信息</p>
      </li>
    </ul>
    <div class="table-box">
      <h1>到店统计</h1>
      <div class="table">
        <el-table :data="visitors" :header-cell-style="{'background-color': '#ebebeb','color':'#333333'}" max-height="390">
          <el-table-column type="index" label="编号" align="center" width="300">
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center" width="300">
          </el-table-column>
          <el-table-column prop="visitTime" label="时间" align="center" width="300">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="lineChart">
      <h1>流量统计</h1>
      <div class="line" style="width:1100px;height:330px;display: flex;justify-content: space-between;">
        <LineChart v-if="time.day.series&&time.day.xAaxis" :data="time.day" name="今日流量统计" id="day" />
        <LineChart v-if="time.month.series&&time.month.xAaxis" :data="time.month" name="每月流量统计" id="month" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  import Schart from 'vue-schart';
  export default {
    data() {
      return {
        visitors: [],
      }
    },
    computed: {
      ...mapState("store", ["time"])
    },
    created() {
      this.asyncGetDay();
      this.asyncGetMonth();
      this.asybcGetVisitors();
    },
    methods: {
      async asybcGetVisitors() {
        let data = await fetch(`/apis/equipment/visit/list?shopId=${window.localStorage.storeId}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        })
        this.visitors=data.data.rows;
        for(let i in this.visitors){
          this.visitors[i].sex==0? this.visitors[i].sex="女": this.visitors[i].sex="男"
        }
      },
      ...mapActions("store", ["asyncGetDay", "asyncGetMonth"])
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav {
    width: 1050px;
    height: 300px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav>li {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .nav>li>img {
    width: 65px;
    height: 57px;
  }

  .nav>li>p {
    font-size: 24px;
    font-weight: 300;
  }

  .table-box {
    width: 100%;
    min-width: 1202px;
    height: 600px;
    background-color: #2f8dfe;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
  }

  h1 {
    font-size: 32px;
    font-weight: 100;
    color: #1b1b1b;
    line-height: 140px;
  }

  .table {
    width: 900px;
    min-height: 390px;
    padding-bottom: 68px;
    text-align: center;
  }

  .lineChart {
    width: 100%;
    min-width: 1202px;
    height: 504px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .line div {
    width: 500px;
    height: 100%;
  }
</style>
