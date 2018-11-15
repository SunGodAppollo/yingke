export default {
  namespaced: true,
  state: {
    users: {
      staff: {},
      vipUsers: {},
      black:{}
    },
    time:{
      day:{},
      month:{}
    }
  },
  mutations: {
    setId(state, payload) {
      window.localStorage.storeId = payload;
    },
    getVip(state, payload) {
      state.users.vipUsers = payload;
    },
    getStore(state, payload) {
      state.users.staff = payload;
    },
    getBlack(state,payload){
      state.users.black = payload;
    },
    getDay(state,payload) {
      state.time.day = payload;
    },
    getMonth(state, payload) {
      state.time.month = payload;
    },
  },
  actions: {
    // 登录
    async login(context, seta) {
      let data = await fetch(`/apis/equipment/login?phone=${seta.name}&passWord=${seta.password}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      if (data.code != 0) {
        seta.$message.error(data.message);
        return;
      }
      let { id } = data.data;  //获取店铺id
      context.commit("setId", id);  //调用方法保存店铺id
      seta.$router.push('/content')
    },
    //获取会员列表
    async asyncGetVip(context, { shopId, pageNumber, pageSize, queryText} = {}) {
      let data = await fetch(`/apis/equipment/member/list?shopId=${shopId}&
      pageNumber=${pageNumber || 1}&pageSize=${pageSize || 12}&queryText=${queryText||''}`, {
          method: "get",
          headers: {
            "Content-type": "application/json"
          },
        }).then(response => {
          return response.json()
        })
      context.commit("getVip", data.data);
    },
    //获取员工列表
    async asyncGetStore(context, { shopId, pageNumber, pageSize, queryText} = {}) {
      let data = await fetch(`/apis/equipment/list?shopId=${shopId}&pageNumber=${pageNumber || 1}&
      pageSize=${pageSize || 12}&queryText=${queryText || ''}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      context.commit("getStore", data.data);
    },
    //获取黑名单
    async asyncGetBlack(context, { shopId, pageNumber, pageSize, queryText } = {}) {
      let data = await fetch(`/apis/equipment/black/list?shopId=${shopId}&pageNumber=${pageNumber || 1}&
      pageSize=${pageSize || 12}&queryText=${queryText || ''}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      context.commit("getBlack", data.data);
    },
    // 获取今日流量
    async asyncGetDay(context) {
      let data = await fetch(`/apis/equipment/personnelbyday/ajax?shopId=${window.localStorage.storeId}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      context.commit("getDay", data.data);
    },
    // 获取本月流量
    async asyncGetMonth(context) {
      let data = await fetch(`/apis/equipment/personnelbymonth/ajax?shopId=${window.localStorage.storeId}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
      }).then(response => {
        return response.json()
      })
      context.commit("getMonth", data.data);
    }
  }
}