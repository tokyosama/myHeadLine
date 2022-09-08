<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 搜索结果列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <article-item
          v-for="item in articleList"
          :key="item.art_id"
          :articleObj="item"
          :isShow="false"
          @click.native="itemClickFn(item.art_id)"
        ></article-item>
      </van-list>
    </div>
  </div>
</template>

<script>
// @click.native是给组件内 根标签 绑定事件，相当于绑定原生点击事件,和子组件里的方法什么的没关系
import { searchResultAPI } from '@/api/Search.js'
import ArticleItem from '@/components/Common/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      // 页码
      page: 1,
      // 搜索结果数组
      articleList: [],
      // 加载状态
      loading: false,
      // 是否全部加载完成
      finished: false
    }
  },
  components: {
    ArticleItem
  },
  async created() {
    //per_page不用传已经有默认值10了,关键字q通过 $route获取当前路由对象的params获取/:kw的kw
    // console.log(this.$route)
    const { data: res } = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.articleList = res.data.results
  },
  methods: {
    async onLoad() {
      // 和首页数据一样不要一上来就加载更多，要有数据，再上拉加载更多
      if (this.articleList.length > 0) {
        this.page++
        // 再获取第2页的新的10个数据
        const { data: res } = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        // 没有更多数据了，要把finished状态改成true
        if (res.data.results.length === 0) {
          this.finished = true
        }
        // 合并数据
        this.articleList = [...this.articleList, ...res.data.results]
        // 加载状态改成false
        this.loading = false
      }
    },
    // 搜索列表的文章点击跳转详情
    itemClickFn(id) {
      this.$router.push(`/detail?art_id=${id}`)
      // 行不通:this.$router.push({ name: 'detail', params: { art_id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>