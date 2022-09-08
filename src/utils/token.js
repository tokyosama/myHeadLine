import { setStorage, getStorage, delStorage } from '@/utils/storage'

// 专门操作token 3个方法
// 登录后存在local的token的key,val发请求时会拿到
const key = 'mylogin_token'
const Rkey = 'refresh_token'
// 设置token
export const setToken = (token) => {
    setStorage(key, token)
}

//获取token,不加大括号要写return
// export const getToken = () => getStorage(key)
export const getToken = () => {
    return getStorage(key)
}


// 移除
export const removeToken = () => {
    delStorage(key)
}
export const removeReToken = () => {
    delStorage(Rkey)
}
