import Vue from 'vue';
import Vuex from 'vuex';
import users from "./users/users";
import store from "./store/index";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    store
  }
})