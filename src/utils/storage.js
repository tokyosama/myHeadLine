// 封装本地存储的方式
// 整个项目使用locStore,sessionStore,cookie只要改变这里就行
// 统一管理方便以后替换修改

// 设置本地存储
export const setStorage = (key, val) => {
    localStorage.setItem(key, val)
}

// 获取本地存储
export const getStorage = (key) => {
    return localStorage.getItem(key)
}

// 移除本地存储
export const delStorage = (key) => {
    localStorage.removeItem(key)
}