import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局指令
import directiveObj from './utils/directive.js'
// 引入vant组件
import '@/components/CommonVant/vantComponent.js'
// 引入highlight让文章详情里的代码块高亮
import 'highlight.js/styles/default.css'


//  引入flexble.js设置跟标签字体大小(移动端适配)
import 'amfe-flexible'

Vue.config.productionTip = false
// 封装中间件,该中间件作用:遇到Input或textarea把光标自动聚焦

// 执行目标对象里install方法(必须是install)并传入Vue类
Vue.use(directiveObj)







new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
