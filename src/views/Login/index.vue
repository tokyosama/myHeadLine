<template>
  <div>
    <van-nav-bar title="头条-登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[
          {
            required: true,
            message: '请填写正确手机号',
            pattern: /^1[3456789]\d{9}$/,
            trigger: 'onChange'
          }
        ]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写6位数密码',
            pattern: /^\d{6}$/,
            trigger: 'onChange'
          }
        ]"
      />
      <div style="margin: 16px">
        <!-- native-type原生 button 标签的 type 属性,里面的submit 用于提交整个表单 -->
        <van-button
          round
          block
          :loading="isLoad"
          loading-text="正在加载"
          :disabled="isLoad"
          type="info"
          native-type="submit"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入接口函数
import { loginAPI } from '@/api/User.js'
import { Toast } from 'vant'
import Notify from '@/ui/Notify.js'

import { setStorage } from '@/utils/storage'

// 引入token各函数
import { setToken } from '@/utils/token.js'
export default {
  name: 'userLogin',
  data() {
    return {
      user: {
        mobile: '13765588516', // 手机号
        code: '' // 密码246810
      },
      code: '246810',
      //点击登录
      isLoad: false
    }
  },
  methods: {
    // 点击登录
    // 点击后给提示且禁用，防止用户疯狂点击
    async onSubmit(val) {
      // onsubmit的val是表单对象
      // val本来就是对象所以接口里变量数据名匹配自然能传参
      // 还有loginAPI({...this.user})loginAPI(this.user)loginAPI({mobile:this.user.mobile})
      // 点了之后先禁用再请求
      this.isLoad = true
      try {
        // const { data: res } = await loginAPI(val)
        const { data: res } = await loginAPI({
          mobile: this.user.mobile,
          code: this.code
        })
        // console.log(res)
        setToken(res.data.token)
        setStorage('refresh_token', res.data.refresh_token)
        Toast({ message: '登录成功' })
        // setRefreshToken(res.data.refresh_token)
        // push跳转后,压栈, 会产生历史记录可以返回,
        // replace跳转后,替换 无法返回
        // 先看看是否有进入未遂的路由(401错误返回登录页点击登录回到原来的界面),没有的话就回到首页
        this.$router.replace({ path: this.$route.query.path || '/layout/home' })
      } catch (err) {
        // promise ajax错误抛出因为async不会捕捉错误信息
        Notify({ type: 'danger', message: '手机号或密码错误' })
      }
      // 无论请求成功失败 状态恢复
      this.isLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>