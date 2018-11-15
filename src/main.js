// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../theme/index.css'
import "./css/reset.css"
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.use(ElementUI);

import echarts from 'echarts'   //全局导入echarts
Vue.prototype.$echarts = echarts   //将echarts配置到此项目中，组件绘图时好用

import store from "./store/store";
// 导入子组件
import Header from './components/content/header.vue'
import Footer from './components/content/footer.vue'
import Nav from './components/content/nav.vue'
import User from './components/users/user.vue'
import LineChart from "./components/content/lineChart";

// 全局注册
Vue.component("Header", Header)
Vue.component("Footer", Footer)
Vue.component("Nav", Nav)
Vue.component("User", User)
Vue.component("LineChart", LineChart)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
