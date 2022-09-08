<template>
  <div>
    <!-- 二级路由展示 -->
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 底部导航栏 -->
    <div>
      <van-tabbar v-model="active" route>
        <!-- 标签栏支持路由模式，用于搭配 vue-router 使用。路由模式下会匹配页面路径和标签的 to 属性，并自动选中对应的标签。 -->
        <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/layout/user"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layOut',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
</style>