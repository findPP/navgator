<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import { state, mutations } from '@/store/index';
export default {
    data() {
        return {};
    },
    created() {
        if (sessionStorage.getItem('store')) {
            try {
                let store = JSON.parse(sessionStorage.getItem('store'));
                mutations.recoverState(store);
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        window.addEventListener('beforeunload', () => {
            try {
                sessionStorage.setItem('store', JSON.stringify(state));
            } catch (error) {
                console.log(error);
            }
        });
        window.addEventListener('pagehide', () => {
            try {
                sessionStorage.setItem('store', JSON.stringify(state));
            } catch (error) {
                console.log(error);
            }
        });
    },
};
</script>
<style lang="scss">
</style>
