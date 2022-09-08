// 统一封装接口
import axios from '@/utils/request.js'
//  需要header的请求在请求拦截器里已经统一装好了

// 获取所有频道
export const getAllChannelsAPI = () => {
    return axios({
        url: '/v1_0/channels',
        method: 'GET'
    })
}

// 获取用户选择的频道,如果用户没有登录，系统会返回后台默认设置的频道
export const getUserChannelsAPI = () => {
    return axios({
        url: '/v1_0/user/channels',
        method: 'GET',
    })
}

// 频道覆盖更新
export const updateChannelsAPI = ({ channels }) => {
    return axios({
        url: '/v1_0/user/channels',
        method: 'PUT',
        data: {
            // 把用户已选的整个频道都选上
            channels

        }
    })
}
// 删除指定频道-可以不使用而用覆盖式更新的方式
// 接口文档里让传指定文章id(拼接到路由后面)
export const removeChannelsAPI = ({ channelId }) => {
    return axios({
        url: `/v1_0/user/channels/${channelId}`,
        method: 'DELETE',
    })
}