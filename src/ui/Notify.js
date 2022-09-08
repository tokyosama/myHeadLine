// 基于vant进行二次封装 也可以自己封装.vue组件(弹窗)
// 封装通知方法
import { Toast } from 'vant'

export default ({ type, message }) => {
    if (type === 'warning' || type === 'danger') {
        type = 'fail'
    }
    Toast({ type, message })

}

// 外部使用时直接 import Ui from '@/utils/Notify.js',无需解构
// 因为这样的话这里export default Notify 的名字就没那么重要了

// Toast 的 参数options 1.有type,可选值有success,fail等, 2.有message  等
// Notify 的 参数options 1.有type,可选值有success,warning等, 2.有message  等

