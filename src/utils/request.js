import axios from 'axios'
import { getToken, removeToken, setToken } from '@/utils/token.js'
import { delStorage } from '@/utils/storage'

import { getNewTokenAPI } from '@/api/index.js'
import router from '@/router/index.js'
import Notify from '@/ui/Notify.js'
const http = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    // baseURL: 'http://geek.itheima.net',
    timeout: 20000,
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 ?. 可选链 操作符，如果?前的对象没有length属性原地返回undefined
    // 如果能获得token且长度大于0 并且config.headers对象没有Authorization属性
    // console.log(getToken().length)
    if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    // console.log('cuole')
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // http响应状态码为2xx,3xx就进入这里
    // 对响应数据做点什么
    return response
}, async function (error) {
    // http响应状态码为4xx,5xx就进入这里
    // 对响应错误做点什么
    // console.dir(error)
    if (error.response.status === 401) {
        // Notify('身份验证过期')
        removeToken()

        // // 方式1:清除Token,让路由守卫判断失效,才能强制去登录页
        // // 不导入router的话this指向undefined this.$router.push('/login')
        // // router.currentRoute相当于this.$route都是拿到当前路由的信息
        // // fullPath拿到完整的路由路径 #后面的一切
        // // 401时拿到当前路由，跳回登录页登录后还能再回到原本的界面
        // router.replace(`/login?path=${router.currentRoute.fullPath}`)

        // 方式2 用refresh_token换回新的tiken再继续使用，用户无感知
        const { data: res } = await getNewTokenAPI()
        // 设置新的token之后要做什么
        // 1.将新token存储在本地
        setToken(res.data.token)
        // 2.更新新的token在请求头里
        error.config.headers.Authorization = `Bearer ${res.data.token}`
        // 3.未完成的请求重新发起
        // 因为这块代码区是4xx5xx报错才会执行,会有error错误对象
        // error.config存着baseURL等发起请求时的配置对象，但是既然进入了
        // 该代码段说明请求报错了，所以接下来带着配置对象重新发请求,此时的token已被更新
        // 所以重新发请求就不会报错了,并且要return出去,否则会执行下面return Promise.reject(error)
        return http(error.config)

    } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
        // 只有满足上面三种情况才是refresh_token也过期了
        Notify({ type: 'warning', message: '身份认证过期,请重新登录' })
        // 需要清除token返回登录页
        removeToken()
        // 清除loc
        delStorage('mylogin_key')
        delStorage('refresh_key')
        router.replace(`/login?path=${router.currentRoute.fullPath}`)
        // router.replace('/login')


    }

    return Promise.reject(error)
})
// 总结:解决401问题
// 方式1.清除token,强制跳转回登录界面,有感知的重新登录,拿到新token替换到本地
// 需要重新点击反馈按钮,再次反馈感觉不好
// 方式2.刷新token,使用登录时保存的refresh_token,调用另一个接口,换回来新token
// 替换到本地,再次完成本地未完成的请求,用户无感知体验好
// 1.登录界面中loc.setitem(refresh_token)存入refresh_token
// 2.401时引入刷新token的api,替换保存到本地新token
// 3.将error对象的headers换成新的token再次发请求，返回Promise到一开始发请求的逻辑页面
// 4.

//  导出axios实例,写成函数导出是为了有些请求没有param,header等
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
    return http({
        url,
        method,
        params,
        data,
        headers
    })
}