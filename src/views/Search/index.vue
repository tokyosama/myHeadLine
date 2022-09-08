<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 input事件在输入框变化时触发事件,@search确定搜索时触发,手机上键盘右下角的 -->
      <van-search
        placeholder="请输入搜索关键单字"
        v-model.trim="kw"
        @input="inputFn"
        background="#007BFF"
        shape="round"
        v-fofo
        @search="searchFn"
      />
    </div>

    <!-- 搜索建议栏不能和搜索历史同时出现 -->
    <div class="sugg-list" v-if="this.kw.length !== 0">
      <!--插值表达式只会把light(str,kw)返回的内容转成字符串 v-html将返回内容转成html -->
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="light(str, kw)"
        @click="suggestClickFn(str)"
      ></div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="historyClickFn(str)"
          >{{ str }}</span
        >
      </div>
    </div>
  </div>
</template>
  
<script>
// 目标：1.跳转到搜索结果界面
// 1.输入框回车->跳转到输入框文字搜索的结果页
// 2.点击联想列表的某一个文章->搜索结果页
// 3.点击历史记录的标签->搜索结果页
import { suggestListAPI } from '@/api/Search.js'
import { setStorage, getStorage } from '@/utils/storage'

export default {
  name: 'mySearch',
  data() {
    return {
      // 搜索关键字
      kw: '',
      // 防抖定时器
      timer: null,
      // 联想建议列表
      suggestList: [],
      // 历史搜索列表
      history: JSON.parse(getStorage('his')) || []
    }
  },
  methods: {
    // 输入框实时变化
    inputFn() {
      // 输入框变化了清除计时器
      clearTimeout(this.timer)
      // 如果搜索栏没有字就清空联想列表
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        // 防抖 1.延时事件
        this.timer = setTimeout(async () => {
          if (this.kw.length === 0) return
          // 获取搜索建议
          // console.log('即将获取')
          const { data: res } = await suggestListAPI({ keywords: this.kw })
          this.suggestList = res.data.options
        }, 400)
      }
    },
    // 处理字符串高亮
    light(originStr, target) {
      // orrginStr:字符串,target:关键字
      // replace只替换第一个匹配的字，rereplaceAll都替换
      // 如果使用变量当正则匹配条件，不能用简化语法糖，必须用js new RegExp
      // (target, 'ig')代表把全部的target都匹配,ihulve大小写，g全局匹配
      const reg = new RegExp(target, 'ig')
      // q:'j' a:'Java','ja','java'
      // 替换后的值不能用target,因为联想列表的关键字有大小写，不能改成关键字的小写方式
      // return originStr.replace(reg, `<span style="color: red;">${target}</span>`)
      // 解决:replace可以有回调函数replace(正则/字符串, 带return回调函数)
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
      if (originStr !== null) {
        const newStr = originStr.replaceAll(reg, (match) => {
          // match是原来字符串里的字符，用原来的，然后换颜色
          return `<span style="color: red;">${match}</span>`
        })
        return newStr
      }
    },

    // 跳转函数
    moveFn(url) {
      // 执行整个函数时这里要加settimeout否则会直接跳转路由当前组件被销毁了,导致history数组没有保存,watch侦听器是
      // 异步执行由于路由跳走了没来得及起作用
      // 包个定时器变成宏任务，宏任务最后执行
      setTimeout(() => {
        this.$router.push(`/search_result/${url}`)
      }, 0)
    },

    // 点击回车搜索
    searchFn() {
      // 将关键字保存到数组里
      // 输入框得有字才能push到数组和跳转
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    // 点击联想菜单标签搜索
    suggestClickFn(str) {
      // 将关键字保存到数组里
      this.history.push(str)
      this.moveFn(str)
    },
    // 点击历史记录搜索
    historyClickFn(str) {
      // 就不需要将关键字保存到数组里
      this.moveFn(str)
    },
    // 清除历史搜索
    clearFn() {
      this.history = []
    }
  },
  watch: {
    // 监听this.history
    history: {
      deep: true,
      // 必须是handler
      handler() {
        // 立刻覆盖式保存本地,只能存字符串,所以把history数组转为json
        // ES6新增两种引用类型(以前是 Array,Object),(新增：Set Map)
        // Set:无序不重复的value集合体(无下角标)
        // 特点:你传入的数组类型，如果有重复元素,会自动清理掉重复元素，返回无重复的Set对象
        //      如果比较的值是对象则比较的是对象的内存地址
        const theSet = new Set(this.history)
        // Array.from将Set类型转为Array数组类型
        const arr = Array.from(theSet)
        setStorage('his', JSON.stringify(arr))
      }
    }
  }
}
</script>
  
  <style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;

  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }

  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;

  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>