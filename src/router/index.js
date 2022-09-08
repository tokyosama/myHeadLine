import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token.js'
// 使用路由懒加载原因:
// 思路:把组件对应js,分成若干个.js，路由切换到哪个界面，才去加载对应.js文件
// 原因:webPack分析入口时,发现router里上来就import所以界面，所以直接打包进app.js,使得app.js很大
// 解决:当路由匹配时才Import引入对应的组件js文件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    beforeEnter(to, from, next) {
      if (getToken()?.length > 0 && to.path === '/login') {
        // next(false)有一定的弊端,用户有可能点界面的返回按钮返回不了
        // 直接跳首页
        next('/layout/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login"  */ '@/views/Login/index.vue'),
    // 独享守卫针对某个路由，如果已经登录了就不能切换登录界面,只能留在原地
    beforeEnter(to, from, next) {
      if (getToken()?.length > 0) {
        // next(false)
        next('/layout/home')
      } else {
        next()
      }
    }

  },
  {
    // 首页
    path: '/layout',
    component: () => import(/* webpackChunkName: "Loyout"  */ '@/views/Layout/index.vue'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home"  */ '@/views/Home/index.vue'),
        meta: {
          // 保存首页离开时滚动条位置
          myscrollT: 0

        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "User"  */ '@/views/User/index.vue'),
      },

    ]
  },
  {
    // 搜索
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "Search"  */ '@/views/Search/index.vue')
  },
  {
    // 搜索列表页
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "SearchResult"  */ '@/views/Search/SearchResult.vue')
  },
  {
    // 文章详情
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "Deatil"  */ '@/views/Article/ArticleDetail.vue')
  },
  {
    // 用户编辑界面
    path: '/user_edit',
    name: 'UserDetail',
    component: () => import(/* webpackChunkName: "Edit"  */ '@/views/User/UserEdit.vue')
  },
  {
    // 小思界面
    path: '/chat',
    name: 'ChatAi',
    component: () => import(/* webpackChunkName: "Chat"  */ '@/views/Chat/index.vue')
  }


]

const router = new VueRouter({
  routes
})


// router.beforeEach((to, from, next) => {


// })

export default router
