<template>
  <div id="app">
    <keep-alive exclude="mySearch,SearchResult,ArticleDetail,UserEdit">
      <!-- 这些一级路由组件不需要缓存,名字是根据组件内的name来的 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
