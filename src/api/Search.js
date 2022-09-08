// 统一封装接口
import axios from '@/utils/request.js'
//  需要header的请求在请求拦截器里已经统一装好了

// 搜索-联想菜单
export const suggestListAPI = ({ keywords }) => {
    return axios({
        url: '/v1_0/suggestion',
        method: 'GET',
        params: {
            q: keywords
        },
    })
}

// 搜索-搜索结果列表
export const searchResultAPI = ({ page = 1, perPage = 10, q }) => {
    return axios({
        url: '/v1_0/search',
        method: 'GET',
        //  接口文档说前两个参数可不传，默认只获取1页10条数据就行
        params: {
            page,
            per_page: perPage,
            q
        },
    })
}