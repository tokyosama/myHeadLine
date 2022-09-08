<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon
          name="cross"
          size="0.37333334rem"
          color="white"
          @click="closeFn"
        />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title">
            点击{{ isEdit ? '删除' : '进入' }}频道
          </span>
        </span>
        <span @click="editFn">{{ isEdit ? '完成' : '编辑' }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <!-- mydelFN必须有(item)否则删除时不管点哪一个只会从最后一个删除 -->
        <van-col
          span="6"
          v-for="item in userList"
          :key="item.id"
          @click="mydelFn(item)"
        >
          <div class="channel-item van-hairline--surround">
            {{ item.name }}
            <!-- 删除的徽标 推荐tag标签的id为0，它不能有删除键 -->
            <van-badge
              color="transparent"
              class="cross-badge"
              v-show="isEdit && item.id !== 0"
            >
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col
          span="6"
          v-for="item in unCheckList"
          :key="item.id"
          @click="moreFn(item)"
        >
          <div class="channel-item van-hairline--surround">{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'ChnnelEdit',
  props: {
    // 用户频道列表
    userList: Array,
    // 未选列表
    unCheckList: Array
  },
  data() {
    return {
      //小叉叉编辑状态
      isEdit: false
    }
  },
  methods: {
    editFn() {
      this.isEdit = !this.isEdit
    },
    // 添加频道
    moreFn(obj) {
      // 在编辑状态时才能添加
      if (this.isEdit === true) {
        // 优化userList是父组件传过来的，不推荐直接改变props违反单向数据流,在父组件Home/index.vue改变
        // this.userList.push(obj)传对象
        this.$emit('addChannelEV', obj)
      }
    },
    // 删除频道
    mydelFn(obj) {
      // 在编辑状态时才能删除
      if (this.isEdit === true) {
        // 优化userList是父组件传过来的，不推荐直接改变props违反单向数据流,在父组件Home/index.vue改变
        // this.userList.push(obj)传对象
        if (obj.id !== 0) {
          this.$emit('removeChannelEV', obj)
        }
      } else {
        // 就是点击标签切换频道
        this.$emit('closeEV')
        // 父组件v-model频道id,子组件使用$emit触发V-model绑定的input事件
        // 把值传递出去绑定给v-model对应的vue变量
        // 必须为input因为v-model会在原地绑定@input事件
        this.$emit('input', obj.id)
      }
    },
    // 关闭弹出层
    closeFn() {
      this.$emit('closeEV', false)
      // 让内部的编辑状态变成false,防止点击编辑后直接退出导致状态维持在编辑状态
      // 或者在父组件定义ref="m"获取子组件对象进而获取里面的值this.$refs.m.isEdit=false
      this.isEdit = false
    }
  }
}
</script>
  
  <style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;

  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>