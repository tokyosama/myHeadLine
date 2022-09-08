<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="$store.state.userPhoto"
            @click="imgFn"
          />
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="profile.name"
        @click="nameClickFn"
      />
      <van-cell
        title="生日"
        is-link
        :value="profile.birthday"
        @click="birthClickFn"
      />
    </van-cell-group>
    <!-- 姓名修改弹窗@confirm点确定按钮时触发 
    而props属性before-close 关闭前的回调函数，可以传方法体
    调用 done() 后关闭弹窗，调用 done(false) 阻止弹窗关闭-->
    <van-dialog
      v-model="nameshow"
      title="提示"
      show-cancel-button
      @cancel="cancelFn"
      :before-close="beforCloseFn"
    >
      <span style="color: #969799">输入新昵称:</span>
      <input type="text" v-model="newName" />
    </van-dialog>

    <!-- 生日修改时间选择器 -->
    <van-popup
      v-model="dateTimeShow"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dataCancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  userProfileAPI,
  updateUserPhotoAPI,
  updatUserProfileAPI
} from '@/api/User.js'
import { Toast } from 'vant'
import { formatDate } from '@/utils/data.js'
export default {
  name: 'UserEdit',
  data() {
    return {
      // 用户信息对象
      profile: {},
      // 姓名弹窗是否出现
      nameshow: false,
      // 日期选择器是否出现
      dateTimeShow: false,
      //最小范围
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      // 当前日期
      currentDate: new Date(),

      newName: ''
    }
  },
  async created() {
    const { data: res } = await userProfileAPI()
    this.profile = res.data
  },
  methods: {
    // input选择框选择文件后的@change事件
    async onFileChange(e) {
      // 用户没选头像，就不往下执行
      if (e.target.files.length === 0) return
      // e.target.files[0]获得选择的文件对象，键是 0,值是文件对象,数组是特殊的对象
      // 创建FormData对象
      const Fd = new FormData()
      // FormData对象固定方法append往表单对象里添加键值对
      // 接口文档里需要传的键必须是 photo
      Fd.append('photo', e.target.files[0])
      // 该接口上传头像返回头像链接
      const { data: res } = await updateUserPhotoAPI(Fd)
      // 局部更新前端头像链接
      this.profile.photo = res.data.photo
      // 同步到Vuex中
      this.$store.commit('SET_USERPHOTO', res.data.photo)
    },
    // 图片点击事件-触发input文件选择器的点击事件
    imgFn() {
      this.$refs.iptFile.click()
    },
    // 修改名字点击事件
    nameClickFn() {
      this.nameshow = true
      this.newName = this.profile.name
    },
    //修改姓名确认框-关闭前的回调函数接收俩参数,由van-dialog里的props属性提供
    async beforCloseFn(action, done) {
      // action参数代表用户点的是comfirm还是cancel,返回这俩字符串
      // done参数是个方法,done()关闭弹窗,done(false)不关弹窗
      if (action === 'confirm') {
        // 点的是确定
        // 姓名校验 1-7位中英文数字组合，使用正则
        // 中文字母数字1-7位
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        // test方法用正则表达式调用返回布尔值，正则.test(字符串)
        if (reg.test(this.newName) === true) {
          // 更改基本信息之改名字-只传姓名
          await updatUserProfileAPI({ name: this.newName })
          // 显示最新姓名
          this.profile.name = this.newName
          // 通过校验,调用done()
          done()
        } else {
          // 没通过校验
          done(false)
          Toast.fail('姓名不符合要求')
        }
      } else {
        // 点的是取消
      }
    },
    //修改姓名确认键-由van-dialog里的事件提供
    cancelFn() {
      this.nameshow = false
    },
    // 生日修改点击事件
    birthClickFn() {
      this.dateTimeShow = true
      this.currentDate = new Date(this.profile.birthday)
    },
    // 生日选择器取消键
    dataCancelFn() {
      this.dateTimeShow = false
    },
    // 生日选择器确认键
    async confirmFn() {
      // 日期选择器组件里currentData是日期对象,而传给后端的必须是字符串
      await updatUserProfileAPI({ birthday: formatDate(this.currentDate) })
      this.profile.birthday = formatDate(this.currentDate)
      this.dateTimeShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
// 自定义弹窗里内容样式,此处的类名是组件的某个div
:v-deep .van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    // 将光标处于输入框中间
    text-align: center;
  }
}
</style>