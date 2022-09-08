<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name === 'xs'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>
        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ obj.msg }}</div>
          <van-image
            fit="cover"
            round
            :src="$store.state.userPhoto"
          />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="word" placeholder="说点什么..." v-fofo>
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getToken } from '@/utils/token.js'
export default {
  name: 'ChatAi',
  data() {
    return {
      // 输入框内容
      word: '',
      // 所有聊天内容
      list: [
        { name: 'xs', msg: '我是小思😀' },
        { name: 'me', msg: '(｡･∀･)ﾉﾞ嗨我是你爹' }
      ],
      // 前后端建立连接的socket对象
      socket: null
    }
  },
  created() {
    // 建立socket连接
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    this.socket.on('connect', () => {})
    // 接收后端传过来的消息
    this.socket.on('message', (sok) => {
      //将接收的sok消息对象放进数组里，v-for显示在前端

      this.list.push({
        name: 'xs',
        msg: sok.msg
      })
      // 最后一条消息滚动到屏幕的范围
      // 获取chat-list最后一个子元素也就是最后一条消息
      // 由于页面真实DOM更新是异步的,数据变化不会立刻更新DOM，得等主线程跑完,所以doc.qu获取的是上一条数据
      // 解决:可以用定时器或者Vue提供的$nextTick(()=>{})等待DOM更新后再执行nextTick里的代码，
      // 如果和定时器一起用,那么定时器最后执行
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        // 再次使用之前点击评论按钮评论自动滑到上面的的事件
        // scrollIntoView
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    // 点击发送
    sendFn() {
      // 如果用户什么都没输入点发送，不会执行下面
      if (this.word.trim().length === 0) return
      // 用socket 链接对象.emit('后端接收消息的事件名',值)
      // 后端需要msg和时间戳两个值
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })
      //将发送的sok消息对象放进数组里，v-for显示在前端
      this.list.push({
        msg: this.word,
        name: 'me'
      })
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        // 再次使用之前点击评论按钮评论自动滑到上面的的事件
        // scrollIntoView
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
      // 清空输入框
      this.word = ''
    }
  },
  destroyed() {
    // 组件销毁时socket服务关闭
    this.socket.close()
    this.socket = null
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
