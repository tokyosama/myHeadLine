<template>
  <div>
    <!-- 头部标题导航,navbar的fix可以让头部div带固定定位样式
        (原理:给组件内props传入true/false影响到组件内动态样式:class) -->

    <div>
      <van-nav-bar fixed title="标题" left-text="返回" left-arrow>
        <template v-slot:left>
          <svg
            t="1661941600982"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2086"
            width="32"
            height="32"
          >
            <path
              d="M1023.6801 177.544517A185.222118 185.222118 0 0 0 839.097782 0H184.902218A184.902218 184.902218 0 0 0 0 
                            184.902218v54.383005zM0 853.813183A184.582318 184.582318 0 0 0 184.902218 1023.6801h653.875664A184.902218 184.902218 
                            0 0 0 1023.6801 839.097782v-47.345205zM566.862855 499.044049c-5.758201 2.5592-17.914402 0-23.352702 2.5592a69.098407 
                            69.098407 0 0 0-16.954702 0 199.297719 199.297719 0 0 0 1.599501 52.143705l54.702905-2.5592a171.466417 171.466417 0 0 0 
                            16.954702-8.957201c24.312402-10.556701 46.385505-22.393002 69.098406-33.909403a319.900031 319.900031 0 0 0 58.541706-28.791003 
                            174.025617 174.025617 0 0 1 47.025305 16.954701c19.833802 7.677601 38.707904 11.196501 58.541705 19.513902a447.860044 447.860044 0 0 0 
                            44.466105 18.234302l57.262105-3.8388v-1.5995a187.781318 187.781318 0 0 0 0-52.143705L895.720087 479.850047a469.613246 469.613246 0 0 
                            1-45.745704-18.234302 206.65542 206.65542 0 0 1-46.705405-16.634802l127.960013-63.980006a479.850047 479.850047 0 0 0 0-91.491409c-63.980006 
                            5.1184-124.761012 7.677601-191.940019 11.836301a270.635426 270.635426 0 0 1-71.657607 2.559201l-61.100906-30.070603c-17.274602 
                            28.791003-37.108404 56.622306-54.702905 84.773508a178.824117 178.824117 0 0 1-26.231803 41.906904c2.8791 7.997501 12.796001 7.357701 
                            20.793502 10.236801a212.733521 212.733521 0 0 1 43.186505 16.954702c8.957201-1.5995 10.236801-11.516401 14.395501-18.234302 
                            10.556701-16.634802 23.352702-33.909403 33.909403-50.864105a349.010934 349.010934 0 0 0 71.657607-3.8388h25.911903c12.796001-1.9194 
                            30.390503 0 43.186504-3.838801 22.712902-5.1184 50.864105 2.8791 71.657607-4.1587v1.5995a17.594502 17.594502 0 0 1 0 8.957201c-4.4786 
                            8.637301-21.433302 11.196501-30.070603 15.675101l-62.380506 31.990004a112.284911 112.284911 0 0 0-24.952202 11.836301 223.930022 223.930022 
                            0 0 1-57.262106-21.113402A118.043112 118.043112 0 0 1 639.800062 383.880037c-10.236801 2.5592-25.592002 37.108404-33.909403 45.745705 1.9194 
                            8.317401 42.226804 20.153702 52.143705 23.352702v1.5995c-30.390503 14.395501-59.501406 31.990003-90.211809 44.466105zM457.457045 
                            598.213058a81.894408 81.894408 0 0 0 22.393002-1.5995A199.617619 199.617619 0 0 0 479.850047 543.830053l-95.97001 5.118401V393.477038a311.90253 
                            311.90253 0 0 0 0-71.657607l-35.189003 2.559201c-7.037801 0-17.274602-1.9194-22.073102 0a95.970009 95.970009 0 0 0-22.393002 0v156.431115a311.90253 
                            311.90253 0 0 1 0 71.657607l-230.967823 13.115901v52.143705a531.673852 531.673852 0 0 0 91.491409-5.1184c14.395501-2.8791 31.990003 3.5189 
                            42.866604-2.5592h26.231803a80.614808 80.614808 0 0 0-14.395502 18.234301c-10.236801 14.395501-21.753202 28.471103-31.990003 43.186505-6.398001 
                            8.637301-17.274602 16.634802-21.113402 27.511402-12.796001 3.199-63.980006 0-72.937207 6.398001a69.098407 69.098407 0 0 0-16.954702 0v52.143705a359.247735 
                            359.247735 0 0 0 70.378007-5.118401c8.957201-1.9194 21.753202 0 28.791003 0 13.435801-2.8791 37.428304 3.199 47.025305-2.5592s26.871603-31.990003 
                            33.909403-43.186504c24.952202-34.549203 57.901906-68.458607 80.934708-104.28741a466.734146 466.734146 0 0 0 76.776007-5.118401c13.115901-3.199 37.108404 2.8791 46.705405-2.8791z"
              fill="#d81e06"
              p-id="2087"
            ></path>
            <path
              d="M167.947516 432.504842a35.189003 35.189003 0 0 0 20.793502 
                            0l67.179007-2.5592c0-12.476101-12.156201-17.914402-18.234302-25.911903C223.930022 383.880037 206.01562 
                            367.885036 194.179319 348.051234l-63.980006 3.8388h-24.952203c3.8388 10.556701 14.715401 17.594502 21.113402 
                            25.911903a398.275539 398.275539 0 0 0 41.587004 53.423305zM170.826617 534.233052a80.614808 80.614808 0 0 0 25.911902 0L255.920025 
                            530.074352c-2.2393-9.277101-10.876601-14.075601-15.675102-20.793502-10.236801-13.755701-20.153702-26.551703-30.070602-40.307404-4.7985-6.398001-12.796001-11.516401-15.675102-19.833802a199.297719 199.297719 
                            0 0 0-54.702905 2.8791c-7.677601 0-18.234302-2.2393-23.672603 0a39.347704 39.347704 0 0 0-11.516401 0c12.476101 19.833802 31.990003 36.148704 44.146205 54.702905 5.758201 7.677601 11.516401 21.433302 21.113402 24.952203z"
              fill="#d81e06"
              p-id="2088"
            ></path>
            <path
              d="M934.747891 598.213058v-51.184005c-59.501406 0-106.84661 8.317401-164.108716 7.997501v-24.952202a257.839425 257.839425 0 0 0-50.864105 2.5592c-7.997501 1.9194-20.153702-2.2393-26.231802 0h-2.559201a86.373008 86.373008 
                            0 0 1 0 26.231803l-162.829115 8.9572v52.143706a275.433927 275.433927 0 0 0 54.702905-3.838801c16.314902-3.5189 33.909403 0 48.304905-2.5592s38.068104 3.5189 47.985004-2.5592a50.544205 50.544205 0 0 1 13.115902 
                            0v77.095907a150.353015 150.353015 0 0 0 0 36.468604c20.473602-1.9194 52.783505-3.8388 77.095907-5.118401V641.079663a134.677913 134.677913 0 0 1 4.158701-33.269604c54.383005 0 107.48641-5.758201 
                            159.950015-8.957201zM427.706342 614.84786l-87.332709 4.1587a121.562012 121.562012 0 0 0 18.234302 37.748204c14.715401 28.791003 29.750703 56.622306 42.866604 86.053109l54.702906-2.559201a81.574508 81.574508 0 0 0 
                            31.990003-2.5592c2.8791-7.677601-11.836301-25.272102-15.675102-31.990003-15.675102-30.390503-29.110903-61.420806-45.425804-90.211809z"
              fill="#d81e06"
              p-id="2089"
            ></path>
            <path
              d="M892.840987 614.84786h-5.1184c-3.8388 2.5592-13.435801 0-19.513902 1.5995a184.902218 184.902218 0 0 0-53.423305 5.118401 168.267416 168.267416 0 0 1 21.113402 35.189003c11.836301 19.513902 25.272102 38.388004 
                            36.468603 58.861606a370.764136 370.764136 0 0 0 63.980006-4.158701h18.234302a1129.56701 1129.56701 0 0 0-58.541705-97.889409zM657.074664 627.963761c-4.7985 3.199-14.075601 0-20.793502 1.5995-15.355201 3.199-45.105904 
                            0-55.022805 5.118401s-8.637301 16.314902-12.796001 23.352702c-9.597001 15.675102-18.874102 31.990003-27.511403 49.584505-4.4786 7.997501-6.398001 18.874102-13.115901 24.952203a17.914402 17.914402 0 0 1 0 
                            3.8388l79.975007-3.8388c12.476101-24.312402 26.231803-49.264605 39.027804-73.257108a140.116214 140.116214 0 0 1 13.115901-25.911902c0-4.1587 0-3.199-2.5592-5.438301z"
              fill="#d81e06"
              p-id="2090"
            ></path>
          </svg>
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#fff" @click="searchFn" />
        </template>
      </van-nav-bar>
    </div>

    <!-- tab栏导航 -->
    <div class="tab_container">
      <!-- sticky粘性定位 animated换标签时专场动画 -->
      <!-- channelActive表示绑定在哪个频道索引(默认是索引，可以nav-tab在标签指定name修改) -->
      <!-- @change事件当标签切换时要更新文章列表 -->
      <van-tabs
        v-model="channelActive"
        sticky
        animated
        offset-top="1.226667rem"
        @change="channelChangeFn"
      >
        <!-- nav-tab在标签指定 name 属性的情况下，v-model 
                    的值为当前标签的 name（此时无法通过索引值来匹配标签）。 -->
        <van-tab
          v-for="item in userChannelList"
          :name="item.id"
          :title="item.name"
          :key="item.id"
        >
          <div class="t1">
            <article-list :channelId="item.id"></article-list>
          </div>
        </van-tab>
      </van-tabs>

      <van-icon
        name="plus"
        size="0.3733334rem"
        class="moreChannels"
        @click="plusClickFn"
      />
    </div>

    <!-- 频道管理弹出层 -->
    <van-popup v-model="show" get-container="body" class="chnnel_popup">
      <channel-edit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="closeFn"
        v-model="channelActive"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
//问题:传递不同的频道id才能获取不同的文章列表
//想法：让van-tabs的v-model关联频道id
//问题: 切换tab再切回来文章会变,因为切换标签又发送请求造成
//想法: 第一次切换tab必定触发created，第二次以后都是display切换了
//      但因为切换时也会触发tab切换更新文章函数，而且所有标签所在的ArticleList都用同一个数组
//解决:将请求放在对应的ArticleList里，这里只负责传入频道id
import ArticleList from '@/components/Common/ArticleList.vue'
import {
  getAllChannelsAPI,
  getUserChannelsAPI,
  updateChannelsAPI,
  removeChannelsAPI
} from '@/api/Channel.js'
import ChannelEdit from '@/components/ChannelEdit.vue'
export default {
  name: 'myHome',
  data() {
    return {
      // tab导航-激活频道id(自己默认频道id为0，页面刚打开是推荐频道高亮-对应文章数据)
      channelActive: 0,
      // 用户频道
      userChannelList: [],
      // 所有频道
      allChannelList: [],
      // 用户没有选的频道
      // userUnselectList: [],
      //  频道管理显示
      show: false,
      // 保存每个频道的滚动位置,用对象保存拿到频道id就行,用数组的话不知道哪个频道滚动条滚动多少
      // {频道1id:滚动距离,频道2id:滚动距离,频道3id:滚动距离}
      channelScrollObj: {}
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  async created() {
    // 获取用户channel列表
    const { data: resc } = await getUserChannelsAPI()
    this.userChannelList = resc.data.channels
    // 获取所有频道
    const { data: resa } = await getAllChannelsAPI()
    this.allChannelList = resa.data.channels
  },
  methods: {
    plusClickFn() {
      this.show = true
    },
    // 子组件的自定义事件-添加频道
    async addChannelFn(valObj) {
      // 把对象放进用户频道列表里
      this.userChannelList.push(valObj)
      // 无需再写代码把valObj从下方unCheckList移除，因为有计算属性同步更新了unCheckList
      // js基本功，后台想要对象的某几个属性，还要一个新属性，新属性的值是对象的数组索引
      // this.userChannelList.forEach((obj,index)=>{
      //     // delete删除键值对
      //     delete obj.name
      //     obj.newRand=index
      // })

      // 把最新的频道数组发给后台,并且接口规定推荐频道,id=0不能传
      const newArray = this.userChannelList.filter((obj) => obj.id !== 0)
      // 问题用户频道，点击新增时，名字被删除了，
      // 因为所有数组里的对象都是同一个内存地址，影响到了ChannelEdit.vue中
      // 解决：拷贝一份数据(浅拷贝)
      const newArrays = newArray.map((obj, index) => {
        const newObj = { ...obj }
        return newObj
      })
      await updateChannelsAPI({ channels: newArrays })
    },
    // 子组件的自定义事件-删除频道
    async removeChannelFn(valObj) {
      // 找删除的valObj.id等于userChannelList里的id的频道的索引
      const index = this.userChannelList.findIndex(
        (obj) => obj.id === valObj.id
      )
      // 删除从索引index起的1个元素
      this.userChannelList.splice(index, 1)
      // 第一种:再调用updateChannelsAPI覆盖式把用户频道发给后台
      //...
      //  第二种:调用删除接口,但是刷新又变回来了，建议第一种
      // 删除接口delete请求状态码204(Not Content) 无返回内容
      await removeChannelsAPI({ channelId: valObj.id })
    },
    // 点击关闭弹出层
    closeFn() {
      this.show = false
    },

    // 点击搜索进入搜索界面事件
    searchFn() {
      this.$router.push('/search')
    },
    // 滚动条滑动事件
    scrollFn() {
      // 保存当前路由界面的滚动距离
      // document.documentElement通过html标签形式
      // 获取scrollTop值,将这个值传给myscrollT
      this.$route.meta.myscrollT = document.documentElement.scrollTop
      // 同时保存当前频道的滚动距离
      this.channelScrollObj[this.channelActive] =
        document.documentElement.scrollTop
    },
    // 频道切换事件
    channelChangeFn() {
      // tab切换后设置滚动条位置
      // tab切换时,van-tab组件?把该容器的height高度设为0,导致滚动条没了
      // 高度而回到顶部,再切回来时channelChangeFn事件触发,height为0记录滚动条数据为0
      // 执行顺序先channelChangeFn记录滚动条位置然后将组件将height设置为0,再scrollFn存储滚动条
      // 解决: 让存滚动条位置的scrollFn先执行用$nextTick
      this.$nextTick(() => {
        document.documentElement.scrollTop =
          this.channelScrollObj[this.channelActive]
      })
    }
  },
  computed: {
    // 目标：用filter在所有频道里收集用户还没选的频道
    unCheckChannelList() {
      const newArr = this.allChannelList.filter((item) => {
        const index = this.userChannelList.findIndex((e) => {
          return e.id === item.id
        })
        //如果找到了
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr

      //简化,会导致点击下方未选中tags时不消失的问题
      // return this.allChannelList.filter(a => this.userChannelList.findIndex(u => u.id === a.id) !== -1)
    }
  },
  // // deactivated使用前提是 组件缓存keep-alive
  // // 如果没有用组件缓存的话切走就会触发destory销毁
  // // 但实际下面方法不行,因为切换组件时是先切换,再执行deactivated
  // deactivated() {
  //   // 保存当前滚动条位置到当前路由对象下的meta里的myscrollT属性
  //   // window和document是监听网页滚动事件,而如果html标签获取了scrollTop,能设置滚动距离,滚动位置
  //   // document.documentElement是doc对象下的获取HTML元素方法
  //   this.$route.meta.myscrollT = document.documentElement.scrollTop
  // }
  // 所以采用滚动条一边滚动一边记录的方式
  activated() {
    // window监听'scroll'滚动事件(必须是scroll),把methods里的scrollFn函数体当window监听事件的回调
    window.addEventListener('scroll', this.scrollFn)
    // 存完myscrollT之后立刻取出并设置滚动条位置
    document.documentElement.scrollTop = this.$route.meta.myscrollT
  },
  deactivated() {
    // 组件切换后把事件监听撤掉
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="less" scoped>
.tab_container {
  // position: fixed;
  padding-top: 46px;

  width: 100%;

  // display: flex;
  // justify-content: space-between;
  .t1 {
    background-color: aqua;
    height: 100%;
    width: 100%;
  }

  // 设置 tabs 容器的样式
  :v-deep .van-tabs__wrap {
    padding-right: 30px;
    background-color: #fff;
  }

  // 设置小图标的样式
  .moreChannels {
    position: fixed;
    top: 62px;
    right: 8px;
    z-index: 999;
  }
}

.chnnel_popup {
  width: 100vw;
  height: 100vh;
  //想给100%需要给html和body设置100%
  //vw vh是css3新出的单位参考浏览器窗口百分比
}
</style>