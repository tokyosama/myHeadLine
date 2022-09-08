// 统一封装接口
import axios from '@/utils/request.js'
//  需要header的请求在请求拦截器里已经统一装好了

// 登录接口
export const loginAPI = ({ mobile, code }) => {
    return axios({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })
}


// 个人中心-用户个人资料,只要token,没有粉丝数关注等信息,给 我的 编辑用户资料用的
export const userProfileAPI = () => {
    return axios({
        url: '/v1_0/user/profile',
        method: 'GET',
    })
}

// 个人中心-用户所有信息，给 我的 界面显示用的
export const userInfoAPI = () => {
    return axios({
        url: '/v1_0/user',
        method: 'GET',
    })
}

// 个人中心-更新头像FormData表单
export const updateUserPhotoAPI = (fd) => {
    return axios({
        url: '/v1_0/user/photo',
        method: 'PATCH',
        // 如果请求体直接是FormData表单对象,不用自己添加Content-Type
        // axios发现数据请求体是表单对象,他不会转换成json字符串
        // 也不会带Content-Type:application/json,而是交给浏览器，
        // 浏览器发现请求体是FormData会自己携带COntentType
        // 传FormData的话请求体不能写data:{},否则还是转成json
        data: fd
    })
}

// 个人中心-更新基本信息
export const updatUserProfileAPI = (userObj) => {
    const obj = {
        name: '',
        gender: 0,
        birthday: ''
    }
    // 循环obj
    for (const key in obj) {
        // 如果外界传来的对象userObj没有key属性，就把obj的key属性删了
        if (userObj[key] === undefined) {
            delete obj[key]
        } else {
            // 若obj,userObj都有key的话,就把userObj的key替换掉obj的key
            obj[key] = userObj[key]
        }
    }
    return axios({
        url: '/v1_0/user/profile',
        method: 'PATCH',
        data: obj
        // 因为data里的参数不能忽略，但是这几个参数是可选值，所以
        // 前端传递对象里面有前端需要的值，data接收这个对象
        // data: {
        //     name,
        //     // 性别
        //     gender,
        //     birthday,
        //     // 个人介绍
        //     intro
        // }

    })
}