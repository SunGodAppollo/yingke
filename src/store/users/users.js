export default {
  namespaced: true,
  state: {
    storeId: "",
  },
  mutations: {
    // getStores(state, payload) {
    //   // Object.assign(state, payload, { rows: payload.rows })  //修改指定项
    // }
  },
  actions: {
    // 添加会员
    async addVip(context, seta) {
      let data = await fetch(`/apis/equipment/member/add/${window.localStorage.storeId}?name=${seta.name}
      &identity=${seta.identity}&grade=${seta.grade}&memberNumber=${seta.memberNumber}
      &telephone=${seta.telephone}&birthday=${seta.birthday}&quarters=${seta.quarters}&remarks=${seta.remarks}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      });
      // 添加失败提示
      if (data.code != 0) {
        seta.$message.error(data.message);
        return;
      }
      // 添加成功提示及跳转
      seta.$message({
        message: data.message,
        type: 'success'
      });
    },
    // 添加员工
    async addUsers(context, seta) {
      let data = await fetch(`/apis/equipment/add/${window.localStorage.storeId}?name=${seta.name}&department=${seta.department}&position=${seta.position}&idNumber=${seta.idNumber}&workNumber=${seta.workNumber}&telephone=${seta.telephone}&remarks=${seta.remarks}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      });
      // 添加失败提示
      if (data.code != 0) {
        seta.$message.error(data.message);
        return;
      }
      // 添加成功提示及跳转
      seta.$message({
        message: data.message,
        type: 'success'
      });
    },
    // 添加黑名单
    async asyncAddBlacklist(context, seta){
      let data = await fetch(`/apis/equipment/blacklist/add/${window.localStorage.storeId}?name=${seta.name}&identity=${seta.identity}&remarks=${seta.remarks}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      });
      // 添加失败提示
      if (data.code != 0) {
        seta.$message.error(data.message);
        return;
      }
      // 添加成功提示及跳转
      seta.$message({
        message: data.message,
        type: 'success'
      });
    }
  }
}