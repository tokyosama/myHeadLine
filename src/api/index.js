// 统一封装接口
import axios from '@/utils/request.js'
//  需要header的请求在请求拦截器里已经统一装好了
import { getStorage } from '@/utils/storage.js'
// 用户-刷新Token
export const getNewTokenAPI = () => {
    return axios({
        url: '/v1_0/authorizations',
        method: 'PUT',
        // 请求拦截器里会判断是否带了Authorization,不带才会加token，带了就不加token了
        headers: {
            Authorization: `Bearer ${getStorage('refresh_token')}`
        }
    })
}