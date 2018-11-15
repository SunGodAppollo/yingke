import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/index.vue'
import Register from "../components/login/register"
import content from '../components/content/content'
import users from '../components/users/index.vue'
import AddVip from "../components/users/addVip"
import AddBlacklist from "../components/users/addBlacklist"
import AddUser from "../components/users/addUser"
import Verification from "../components/users/verification"
import Statement from "../components/operation/statement"
import Brand from "../components/brand/brand";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/content',
        name: 'content',
        component: content
      },
    {
    path: '/users',
    name: 'users',
    component: users
  }, {
      path: '/addVip',
    name: 'AddVip',
    component: AddVip
    }, {
      path: '/addBlacklist',
      name: 'AddBlacklist',
      component: AddBlacklist
    }, {
      path: '/verification',
      name: 'Verification',
      component: Verification
    },
    {
      path: '/statement',
      name: 'Statement',
      component: Statement
    },
    {
      path: '/addUser',
      name: 'AddUser',
      component: AddUser
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/brand',
      name: 'Brand',
      component: Brand
    }
]
})
