import axios from 'axios'
import { Loading } from 'element-ui'
const instance = axios.create({
    baseURL: '/',
    timeout: 20000,
})
const loadingService = {
    instance: null,
    open(config) {
        if (typeof config.loading === 'boolean' && !config.loading) return
        const params = {
            lock: true,
            text: 'loading',
            background: 'rgba(0,0,0,0.65)'
        }
        if (typeof config.loading === 'object') {
            Object.assign(params, config.loading)
        }
        this.instance = Loading.service(params)
    },
    close() {
        if (this.instance) {
            this.instance.close()
        }
    }
}
axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    loadingService.open(config)
    return config
}, (error) => {
    loadingService.close()
    return Promise.error(error)
})

axios.interceptors.response.use((response) => {
    loadingService.close()
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, (error) => {
    loadingService.close()
    if (error.response.status) {
        switch (error.response.status) {
            case 401: //登录过期
                window.location.href = '#/login'
                break
        }
    }
})




export { axios }