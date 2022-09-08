// 封装专门处理时间的方法
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 到指定时间需要的插件
import 'dayjs/locale/zh' // 集成中文
// JSDOC注释文档注释
/**
 * @param {*} 之前的时间
 * @returns 系统时间之前指定时间的距离值
 * 
 */
export const timeAgo = (targetTime) => {
    // 格式化时间
    dayjs.extend(relativeTime)
    dayjs.locale('zh')
    const a = dayjs()
    const b = dayjs(targetTime)
    return a.to(b) // 返回多久之前...
}
export const formatDate = (dataObj) => {
    // 把日期对象调用format方法格式化为年月日
    return dayjs(dataObj).format('YYYY-MM-DD')

}
// v-for="(item, index) in articleObj.cover.images" :key="index"