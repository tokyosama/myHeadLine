import Vue from 'vue'
import {
    NavBar, Form, Field, Button, Tabbar,
    TabbarItem, Icon, Tab, Tabs, Cell, List,
    PullRefresh, ActionSheet, Popup, Row, Col, Badge,
    Search, Image as VanImage, Divider, CellGroup, Tag, Dialog,
    DatetimePicker, Loading, Lazyload
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Loading)
Vue.use(Lazyload, {
    // lazyComponent: true,
    // 如果懒加载图片失败使用错误提示的图片
    error: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.zNMGM--NNG3Dq5cy2JG5qAAAAA?w=178&h=178&c=7&r=0&o=5&dpr=1.25&pid=1.7'
})
