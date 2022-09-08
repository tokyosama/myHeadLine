<template>
  <div>
    <!-- 评论列表,后面动态类名写法 :class="{'类名A':判断条件,'类名B':判断条件}" 因为不管是大/小评论盒子都会遮挡
    最后一条评论的下面评论时间的部分遮挡的程度还不一样,所以要在对应盒子出现时给不同类名，类名的样式
    都是将评论列表盒子padding-bottom一下不被遮挡 -->
    <!-- van-list如果包裹在这，触底时的‘加载更多’会作为此div内容在当前盒子内显示不会因为padding-bottom被遮挡因为被挤上去了 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtBox,
        'art-cmt-container-2': !isShowCmtBox
      }"
    >
      <!-- 评论的 Item 项 
         1.van-list包裹列表检测网页滚动事件判断触底时触发load事件
         2.immediate-check不让list组件上来就检查是否触底，原因:list内容是异步请求的，标签
         挂载是没有高度，此时如果检测肯定是触底状态-->
      <van-list
        v-model="isloading"
        :finished="finished"
        finished-text="没有更多评论了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="cmt-item" v-for="obj in commentArr" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="obj.is_liking"
                @click="likeFn(true, obj)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="likeFn(false, obj)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 底部添加评论区域 - 1 评论输入框显示的地方 两者互斥 -->
    <div>
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtBox === true">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="toggleShowFn">发表评论</div>
        <div class="icon-box">
          <!-- 在bage组件上有content属性写上数字就会在标签右上角显示，模拟评论数功能 -->
          <van-badge max="99" :content="totalCount === 0 ? '' : totalCount">
            <!-- 点击评论数徽标自动跳到评论区第一条评论，4种情况 -->
            <van-icon
              name="comment-o"
              size="0.53333334rem"
              @click="commentClickFn"
            />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 点击后输入评论的地方 两者互斥 @blur是原生的绑定失去焦点事件-->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea
          placeholder="友善评论、理性发言、阳光心灵"
          v-fofo
          @blur="blurFn"
          v-model="comText"
        ></textarea>
        <van-button
          type="default"
          :disabled="comText.length === 0 ? true : false"
          @click="sendFn"
          >发布</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  commentLikingAPI,
  commentDisLikingAPI,
  commentListAPI,
  commentSendAPI
} from '@/api/Article.js'
import { timeAgo } from '@/utils/data.js'
export default {
  name: 'CommentList',
  data() {
    return {
      // 评论数
      offset: null,
      // 评论列表
      commentArr: [],
      // 评论数量
      totalCount: 0,
      // 评论分页量
      lastId: null,
      //  是否评论输入框
      isShowCmtBox: true,
      // 自己发布的评论内容
      comText: '',
      // 上滑加载更多
      isloading: false,
      // 评论是否到底
      finished: false
    }
  },

  async created() {
    // 获取评论详情和总数,和last_id
    const { data: res } = await commentListAPI({
      id: this.$route.query.art_id
    })
    this.commentArr = res.data.results
    this.totalCount = res.data.total_count
    this.lastId = res.data.last_id
    // 如果该文章没有评论,直接让finished判断为没有更多数据状态
    if (res.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    timeAgo,
    // 评论点赞取消点赞
    async likeFn(bool, obj) {
      if (bool === true) {
        // 如果是红心那么点击就是取消点赞
        // 调用取消点赞接口
        obj.is_liking = false
        const res = await commentDisLikingAPI({ comId: obj.com_id })
      } else {
        // 如果是空心那么点击就是点赞
        // 调用点赞接口
        obj.is_liking = true
        const res = await commentLikingAPI({ comId: obj.com_id })
      }
    },
    // 点击显示输入评论的大盒子
    toggleShowFn() {
      this.isShowCmtBox = false
    },
    // 点击评论数徽标自动跳到评论区第一条评论，4种情况
    commentClickFn() {
      // 设置window.scollTo(0,文章高度)使页面进行瞬间滚动，让网页瞬间滚动指定像素值到屏幕最顶端，x轴不动,y轴滑动文章高度的像素值
      // 目标:求文章高度,文章盒子在父组件ArticleDetail.vue下
      //      文章信息区域类名为article-container的div
      // 代码运行后真实DOM已经在网页上了,可以直接通过doc.query获取元素
      //   const height = document.querySelector('.article-container').scrollHeight
      //   window.scrollTo(0, height)//会瞬间到底部
      // Js原生动画在文档里,这里采用让点赞盒子.like-box滚动到屏幕顶端,一个新的函数 原生标签.scrollIntoView
      document.querySelector('.like-box').scrollIntoView({ behavior: 'smooth' })
    },
    // 输入框失去焦点事件
    blurFn() {
      // 问题:在高评论盒子点击发布评论按钮发现瞬间切换到了低评论盒子,并且没有评论
      // 原因:点击发布时输入框失去焦点触发isShowCmtBox = true被v-if移除了标签,导致点击事件没来得及执行
      // 方法:设置settimeout让失去焦点最后执行
      setTimeout(() => {
        this.isShowCmtBox = true
      }, 0)
    },
    // 发布评论
    async sendFn() {
      // 发布评论接口返回了该用户个人信息和评论信息,可用于评论显示个人信息
      const { data: res } = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      // 将接口返回的信息插在评论数组第一个
      this.commentArr.unshift(res.data.new_obj)
      // 让评论数加1,这个加一是前端加1,不过刷新后评论数又通过请求得到，所以是这么写的
      this.total_count++
      // 输入框置空
      this.comText = ''
      // 发布完评论得让页面滚动到第一条评论上
      this.commentClickFn()
    },
    // 加载更多评论
    async onLoad() {
      // 如果评论列表大于0才会加载不能一上来就处于加载更多的状态,即使给了immediate-check也要写这一层的ifelse,
      // 原因和主页的原因一样,因为不只是主页先滚动文章再点进去，搜索栏搜索结果列表滚动之后在点进去也会有类似的问题
      // 主页的immediate-check和if else也都不能省，详见Common/ArticleList.vue
      if (this.commentArr.length > 0) {
        // 获取更多评论，这次布置传文章id还要传offset偏移量拿到'下一页'的评论数
        const { data: res } = await commentListAPI({
          id: this.$route.query.art_id,
          // offset偏移量根据last_id得到
          offset: this.lastId
        })
        // 合并评论列表
        this.commentArr = [...this.commentArr, ...res.data.results]
        // 更新总评论数(感觉不用更新)和last_id
        this.totalCount = res.data.total_count
        this.lastId = res.data.last_id
        // lastId=null说明没有更多评论了
        if (this.lastId === null) {
          // 更新finished状态
          this.finished = true
        }
        // 完成一次加载更多需要更改isloading状态
        this.isloading = false
      } else {
        // 如果评论列表大于0才会加载不能一上来就处于加载更多的状态
        this.isloading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
