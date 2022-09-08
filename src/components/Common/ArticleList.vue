<template>
  <!-- 每个标签的所有文章所在的地方 -->
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- offset判定滚动条与底部距离小于 offset 时触发load下拉加载更多事件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        offset="50"
      >
        <!-- 用文章id art_id 不要用作者id aut_id因为一个作者发多个文章 -->
        <!-- 把文章id渲染后还要把文章item对象传到子组件里,为了让子组件拿到该文章信息  -->
        <article-item
          v-for="item in list"
          :key="item.art_id"
          :articleObj="item"
          @dislikeEV="dislikeFn"
          @reports="reportFn"
          @click.native="itemClickFn(item.art_id)"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getToken } from '@/utils/token.js'
import { Toast } from 'vant'
import ArticleItem from './ArticleItem.vue'
import {
  getAllArticleListAPI,
  disklikeArticleAPI,
  reportArticleAPI
} from '@/api/Article.js'
// 首页 滚动位置保存
// 问题: 首页滚动条滚动到某个地方,点击 我的 ，再切换回来，滚动条又回到顶部
// 疑惑:keep-alive只保存标签样式js变量,不会保存滚动条位置
// 原因:滚动条是处在整个网页的,切换到我的页面,页面高度不够高,没有滚动条,滚动条位置会回到顶部
//      再切回首页滚动条还在顶部
// 解决:首页切换走的时候,在它的路由对象meta中保存滚动位置

// List 组件通过 loading 和 finished 两个变量控制加载状态，
// 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
// 此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
// 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

// 下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，
// 操作完成后将 v-model 设置为 false，表示加载完成。
export default {
  data() {
    return {
      list: [],
      // 底部加载状态
      loading: false,
      // 底部完成状态
      finished: false,
      // 时间戳，用于分页
      theTime: new Date().getTime(),
      // 顶部加载状态
      isLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    // list: {
    //     type: Array,
    //     // 因为eslint要求default为函数
    //     default: () => []
    // },
    channelId: {
      type: Number,
      // 因为eslint要求default为函数
      default: () => 0
    }
  },
  created() {
    this.getArticleListFn()
  },
  methods: {
    // 专门发送请求
    // tab切换更新文章,在created时调用一次,每次切换时tab时调用一次
    // 第一次加载系统时间->后台返回0-9条数据->携带第十条数据的时间戳pre_timesamp值返回
    // 第二次(timesamp)-减上一次pre_timesamp代表告诉后台从指定时间戳    再往后找十个数据

    // 问题:第一次下拉加载更多时created里请求和Onload里请求同时发送请求的都是最新且一样的数据,所以导致
    //      合并数组是发现前十个和接下来10个都一样，原本article-item里的:key='文章.id'是不能重复的,
    //      这样一操作会导致key重复
    // 原因:van-list组件挂载时默认会判断一次是否触底，由于第一页的数据也是网络请求，数据来了更新DOM,所以刚开始
    //      标签没有高度,导致Load事件上来就触发
    // 解决: van-list有immediate-check是否在初始化时立即执行滚动位置检查，改成false,或者zaoonLoad加判断
    async getArticleListFn() {
      const { data: resa } = await getAllArticleListAPI({
        channelId: this.channelId,
        timestamp: this.theTime
      })
      // 拿到下一页页码
      this.theTime = resa.data.pre_timestamp
      // 合并数组
      // created上来第一次list是空数组合并空数组没问题
      // onload()触底加载更多，2个数组合并没问题
      this.list = [...this.list, ...resa.data.results]

      // 拿到新的10个数据就关闭loading,文档说的，如果不关则一直是加载中的状态
      this.loading = false
      if (resa.data.pre_timestamp === null) {
        //最后没有数据了
        this.finished = true
        return 0
      }
      //  上拉刷新isLoading变false
      this.isLoading = false
    },

    // 底部加载事件方法,第二次至din次加载
    async onLoad() {
      // console.log('出发了inload')
      // immediate-check(下面简称ic):内部不要进行判断是否触底，监听滚动事件的代码还在
      // 源码:mounted:func m(){ if(this.ic) {check()} }ic为true立刻执行check();
      //     有一处用bind绑定了scoll滚动事件来执行check()，但这个滚动事件和ic无关，所以scoll一直在
      // 第一个频道 滚动到底部，再切换第二个频道时内容还没有那么高，滚动会从底部回到顶部
      // 这时候发生了滚动,所以滚动事件还是触发了,由于这个滚动事件和ic无关,所以immediate-check判断无效，会报错
      if (this.list.length === 0) {
        // 如果页面没有数据没有高度，本次onload不执行
        return
      }
      this.getArticleListFn()
    },

    //  上拉刷新
    async onRefresh() {
      // list清空，再来份新数据
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },

    // 文章-不感兴趣
    async dislikeFn(id) {
      const token = getToken()
      try {
        await disklikeArticleAPI({
          artId: id
        })
        // console.log(res)
        Toast('不感兴趣')
      } catch (error) {
        Toast('删除失败')
      }
    },

    //文章-二级面板-举报等
    async reportFn(id, val) {
      try {
        await reportArticleAPI({ artId: id, type: val })
        Toast('反馈成功')
      } catch (error) {
        Toast('反馈失败')
      }
    },

    // 首页文章点击跳转详情
    itemClickFn(id) {
      this.$router.push(`/detail?art_id=${id}`)
      // 行不通:this.$router.push({ name: 'detail', params: { art_id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>