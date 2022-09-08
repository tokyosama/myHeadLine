const directiveObj = {
    // Vue.use会去obj里找install方法,install传入Vue对象
    install(Vue) {
        // 全局自定义指令v-fofo,指令所在的标签被插入到真实DOM才触发
        // 如果标签用display:none隐藏再出现不会再次触发inserted
        // 若想标签更新还起作用，用uodate
        Vue.directive('fofo', {
            // 配置项函数
            inserted(el) {
                // 针对指令fofo所在的原生标签执行命令
                // 如果v-fofo在组件里定义绑定原生组件不一定是自己期望的
                // 目标:找到标签结点el的input框

                // 结点.Nodename拿到标签本身名字,拿到的是大写的名字，如果标签本身就是INPUT框或者TEXTAREA
                if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
                    el.focus()
                } else {
                    // 说明el本身不是输入框
                    const e = el.querySelector('input')
                    const et = el.querySelector('textarea')
                    // 如果获取到了input让input聚焦
                    if (e) e.focus()
                    // 如果获取到了text让text聚焦
                    if (et) et.focus()

                }

            },
            // 指令所在标签更新时触发
            update(el) {
                // 再把上面的逻辑走一遍
                if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
                    el.focus()
                } else {
                    const e = el.querySelector('input')
                    const et = el.querySelector('textarea')
                    if (e) e.focus()
                    if (et) et.focus()
                }
            }
        })
    }

}

export default directiveObj