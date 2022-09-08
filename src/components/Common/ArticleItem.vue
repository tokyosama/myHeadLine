<template>
  <div>
    <!-- 一条文章的单元格,没必要在这里绑定点击进入文章详情，在父组件绑定@click.native事件就行，会在这里的根节点绑定事件的 -->
    <van-cell>
      <!-- 标题区域插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ articleObj.title }}</span>
          <!-- 单图 -->
          <!--业务:后端的图片可能也是从别的地方加载来的,后端只保留了地址
          会出现404/403问题 // 404无法解决，前端只能放个占位图片 //403无权请求此地址因为后端做了图片防盗链
          防止用img标签请求此图片地址，后端判断请求的Reffer字段来源是不是自己的地址 -->
          <!-- 有了图片懒加载还是用回img原生标签(后来发现van-image也可以),把:src="articleObj.cover.images[0]"去掉 -->
          <img
            class="thumb"
            v-if="articleObj.cover.type === 1"
            v-lazy="articleObj.cover.images[0]"
          />
          <!-- <van-image
            class="thumb"
            v-if="articleObj.cover.type === 1"
            :src="articleObj.cover.images[0]"
          >
            <template v-slot:error>图片加载失败</template>
          </van-image> -->
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="articleObj.cover.type > 1">
          <img
            v-for="(imgUrl, index) in articleObj.cover.images"
            :key="index"
            class="thumb"
            v-lazy="gotimg(imgUrl)"
            alt=""
          />
          <!-- <van-image
            v-for="(imgUrl, index) in articleObj.cover.images"
            :key="index"
            class="thumb"
            :src="gotimg(imgUrl)"
          >
            <template v-slot:error>图片加载失败</template>
          </van-image> -->
        </div>
      </template>
      <!-- label区域插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ articleObj.aut_name }}</span>
            <span>评论数:{{ articleObj.comm_count }}</span>
            <span>{{ formatData(articleObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 stop阻止事件冒泡
          子元素和父级元素触发的是相同事件(click)的时候，当子元素被触发的时候父元素也会被触发冒泡机制
          该组件的×跳出反馈页同时父组件又触发路由跳转，所以阻止该组件的×事件冒泡 -->
          <van-icon
            name="cross"
            @click.stop="show = true"
            v-if="isShow"
          ></van-icon>
        </div>
      </template>
    </van-cell>

    <!-- 反馈面板 get-container指定挂载结点，不设置的话蒙层选项会在该组件底部显示，这样你得往下拉才能看到
        由于最终是单页面应用，只有一个body结点，故可以挂载到body getContainer() {return document.querySelector('.my-container');}, -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="cancelFn"
      @close="closeFn"
      :cancel-text="bottomext"
      get-container="body"
    />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/data.js'
import { firstActions, secondActions } from '@/api/reports.js'
export default {
  name: 'ArticleItem',
  data() {
    return {
      // 直接在data里传函数,timeAgo是函数体,函数要的参数在formatData(参数)传
      formatData: timeAgo,

      // 是否显示反馈面板
      show: false,
      actions: firstActions,
      bottomext: '取消',

      gotimg(url) {
        url = url.replace('localhost:8000', 'geek.itheima.net')
        return url
      }
    }
  },
  mounted() {
    // console.log(typeof this.articleObj)
  },
  props: {
    // 文章的信息,由ArticleList传进来
    articleObj: {
      type: Object,
      // 因为eslint要求default为函数
      default: () => {
        return {}
      }
    },
    // 搜索列表不需要右下角小叉叉
    isShow: {
      type: Boolean,
      // 首页没传isShow默认需要小叉叉
      default: true
    }
  },
  computed: {},
  methods: {
    // 目标1:点击反馈进行数据切换
    // 1.监听点击事件区分以后点击的是哪一个
    // 目标2:点击反馈就不是取消按钮而是返回按钮
    // onSelect接收俩参数，一个是action.name,另一个是item索引值
    onSelect(action, item) {
      //默认情况下点击选项不会自动收起
      //可以通过 close-on-click-action 属性开启自动收起
      if (action.name === '反馈垃圾内容') {
        //
        this.actions = secondActions
        this.bottomext = '返回'
      } else if (action.name === '不感兴趣') {
        // console.log('s')
        // 发请求传文章id,虽然可以在这里发送,但为了让代码内聚性更高，选择在ArticleList发请求
        this.$emit('dislikeEV', this.articleObj.art_id)
        this.show = false
      } else {
        // 说明选择的是二级面板里的内容
        this.$emit('reports', this.articleObj.art_id, action.value)
        // 直接关，下面closeFn会帮忙切
        this.show = false
      }
    },
    // 反馈面板底部取消按钮
    cancelFn() {
      if (this.bottomext === '返回') {
        this.show = true
        this.bottomext = '取消'
        this.actions = firstActions
      }
    },
    // 反馈面板底部关闭按钮
    closeFn() {
      this.actions = firstActions
      this.bottomext = '取消'
    }, 
  }
}
</script>

<style lang="less" scoped>
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* 图片的样式, 矩形黄金比例：0.618 */
  .thumb {
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
}

.label-box {
  display: flex;
  height: 20px;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 0 3px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>