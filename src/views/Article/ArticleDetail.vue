<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 文章等待加载中,当文章详情对象artobj的key长度wei0时出现正在加载中 -->
    <van-Loading color="#f76" v-if="Object.keys(artObj).length === 0"
      >正在加载文章</van-Loading
    >
    <!-- 主体区域 -->
    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{ artObj.title }}</h1>

        <!-- 用户信息(对于文章作者) -->
        <van-cell
          center
          :title="artObj.aut_name"
          :label="formatDate(artObj.pubdate)"
        >
          <template #icon>
            <img :src="artObj.aut_photo" alt="" class="avatar" />
          </template>
          <template #default>
            <div>
              <van-button
                type="info"
                size="mini"
                v-if="artObj.is_followed === true"
                @click="followFn(true)"
                >已关注</van-button
              >
              <van-button
                icon="plus"
                type="info"
                size="mini"
                plain
                v-else
                @click="followFn(false)"
                >关注</van-button
              >
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 后台返回的是html字符串，通过v-html转成HTML模板 -->
        <div class="art-content" v-html="artObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞(对于文章) attitude -1无态度 0不喜欢 1点赞,-1也是true,所以必须写===1 -->
        <div class="like-box">
          <van-button
            icon="good-job"
            type="danger"
            size="small"
            v-if="artObj.attitude === 1"
            @click="loveFn(true)"
            >已点赞</van-button
          >
          <van-button
            icon="good-job-o"
            type="danger"
            plain
            size="small"
            v-else
            @click="loveFn(false)"
            >点赞</van-button
          >
        </div>
      </div>

      <!-- 评论 -->
      <div>
        <comment-list></comment-list>
      </div>
    </div>
  </div>
</template>

<script>
import {
  articleDetailAPI,
  userFollowAPI,
  userUnfollowAPI,
  articleLikeAPI,
  articleUnlikeAPI
} from '@/api/Article.js'
import { timeAgo } from '@/utils/data.js'
import CommentList from '@/components/Common/ArticleCommentList.vue'
export default {
  name: 'ArticleDetail',
  data() {
    return {
      // 保存该文章对象
      artObj: {}
    }
  },
  components: {
    CommentList
  },
  async created() {
    // 获取文章详情
    const { data: res } = await articleDetailAPI({
      // 参数从当前路由路径上取
      artId: this.$route.query.art_id
    })
    this.artObj = res.data
  },
  methods: {
    // 方法名:方法体，渲染模板直接使用方法名(参数)
    formatDate: timeAgo,
    // 关注取关
    async followFn(bool) {
      if (bool) {
        // 点击已关注则取关
        // 调取关接口
        const res = await userUnfollowAPI({ uid: this.artObj.aut_id })
        this.artObj.is_followed = false
      } else {
        // 点击关注按钮则关注
        // 掉关注接口
        const res = await userFollowAPI({ uid: this.artObj.aut_id })
        this.artObj.is_followed = true
      }
    },
    // 点赞取消点赞attitude -1无态度 0不喜欢 1点赞,-1也是true,所以必须写===1
    async loveFn(bool) {
      if (bool === true) {
        // 点击红心则取消点赞
        // 调取消点赞接口
        const res = await articleUnlikeAPI({ artId: this.artObj.art_id })
        // console.log(this.artObj)
        this.artObj.attitude = 0
      } else {
        // 点击心按钮则点赞
        // 掉点赞接口
        const res = await articleLikeAPI({ artId: this.artObj.art_id })
        // console.log(this.artObj)
        this.artObj.attitude = 1
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  :v-deep img {
    width: 100%;
  }
  :v-deep pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading {
  text-align: center;
  // 不被头部遮挡
  padding-top: 46px;
}
</style>