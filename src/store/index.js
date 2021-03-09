import Vue from 'vue'


export let state = Vue.observable({
    userData: {},
})


export const mutations = {
    saveUserData(data) {
        state.userData = Object.assign({}, data)
    },
    recoverState(data) {
        let temp = Object.assign({}, data)
        state = Vue.observable(temp)
    }
}