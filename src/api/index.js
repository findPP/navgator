import { axios } from '@/axios/index.js'

export default {
    getUrlMessage(params) {
        return axios.post('/api/analysisUrl', params)
    },
    //登录
    login(params) {
        return axios.post('/api/login', params)
    },
    //注册
    register(params) {
        return axios.post('/api/register', params)
    },
    // 存储url
    addUserUrl(params,body) {
        if(body){
            return axios.post(`/api/postUrl?icon=${''}&id=${params.id}&title=${params.title}&url=${params.url}`,body)
        }else{
            return axios.post(`/api/postUrl?icon=${params.icon}&id=${params.id}&title=${params.title}&url=${params.url}`)
        }
        
    },
    //获取url列表分页
    getUrlList(params) {
        return axios.post('/api/getUrlList', params)
    },
    //删除url
    deleteUrl(params) {
        return axios.post('/api/deleteUrl', params)
    },
    //修改url
    updateUrl(params) {
        return axios.post('/api/updateUrl', params)
    }
}