// 统一封装接口
import axios from '@/utils/request.js'
//  需要header的请求在请求拦截器里已经统一装好了

// 获取文章列表
export const getAllArticleListAPI = ({ channelId, timestamp }) => {
    return axios({
        url: '/v1_0/articles',
        method: 'GET',
        // 查询字符串,axios会拼接在?之后
        params: {
            //频道id
            channel_id: channelId,
            //时间戳,请求新的推荐数据传当前时间戳，请求历史推荐数据传指定的时间戳
            timestamp
        }
    })
}

// 文章-不感兴趣
export const disklikeArticleAPI = ({ artId }) => {
    return axios({
        url: '/v1_0/article/dislikes',
        method: 'POST',
        data: {
            // 传文章id
            target: artId
        },
    })
}

// 文章-二级面板-举报等
export const reportArticleAPI = ({ artId, type }) => {
    return axios({
        url: '/v1_0/article/reports',
        method: 'POST',

        data: {
            // 传文章id
            target: artId,
            // 举报类型
            type: type,
            //
            remark: '如果想写,在逻辑页面下如果点击的类型是0,给出弹窗输入,传参到这'
        },
        // headers: {
        //     Authorization: `Bearer ${getToken()}`
        // }
    })
}

// 文章-文章详情
export const articleDetailAPI = ({ artId }) => {
    return axios({
        url: `/v1_0/articles/${artId}`,
        method: 'GET',
    })
}

// 文章-关注作者
export const userFollowAPI = ({ uid }) => {
    return axios({
        url: `/v1_0/user/followings`,
        method: 'POST',
        data: {
            target: uid
        }
    })
}

// 文章-取关作者
export const userUnfollowAPI = ({ uid }) => {
    return axios({
        url: `/v1_0/user/followings/${uid}`,
        method: 'DELETE',
    })
}

// 文章-点赞文章
export const articleLikeAPI = ({ artId }) => {
    return axios({
        url: `/v1_0/article/likings`,
        method: 'POST',
        data: {
            target: artId
        }
    })
}

// 文章-取赞文章
export const articleUnlikeAPI = ({ artId }) => {
    return axios({
        url: `/v1_0/article/likings/${artId}`,
        method: 'DELETE',
    })
}

// 文章-获取评论列表
export const commentListAPI = ({ id, offset = null, limit = 10 }) => {
    return axios({
        url: `/v1_0/comments`,
        method: 'GET',
        params: {
            // type表评论类型,a对文章评论，c对评论进行评论，楼中楼自行写
            // source表文章id 或评论id,offset代表获取评论的偏移量,不传代表从第一页开始获取数据(获得几条评论)
            // 1-.axios只针对params参数发现params里的键值对为null,会忽略此参数，不把它拼接在?后面
            type: 'a',
            source: id,
            offset,
            limit
        }
    })
}

// 文章-点赞
export const commentLikingAPI = ({ comId }) => {
    return axios({
        url: `/v1_0/comment/likings`,
        method: 'POST',
        data: {
            // 评论id
            target: comId
        }
    })
}

// 文章-取消点赞
export const commentDisLikingAPI = ({ comId }) => {
    return axios({
        url: `/v1_0/comment/likings/${comId}`,
        method: 'DELETE',
    })
}

// 文章-发布评论
export const commentSendAPI = ({ id, content, artId = null }) => {
    // 2-.axios中,data请求体传参如果值为null是不会忽略这个参数的,也会把参数名和值
    // 键值对携带给后台(只有params遇到null才会忽略)
    // 接口文档说如果对文章评论不需要传art_id,对评论进行评论需要传递art_id
    const obj = {
        // 文章id
        target: id,
        content,
    }
    if (artId !== null) {
        // 可选参数,对文章评论不需要传,对评论进行评论需要传
        obj.art_id = artId
    }
    return axios({
        url: `/v1_0/comments`,
        method: 'POST',
        data: obj
    })
}