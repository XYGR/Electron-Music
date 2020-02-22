<template>
    <div id="app">
        <TopBar></TopBar>
        <router-view>

        </router-view>
    </div>
</template>

<script>
    import TopBar from "./components/TopBar";
    export default {
        name: 'electron-app',
        components:{
            TopBar
        }
    }
</script>

<style>
    @import './assets/reset.css';
    @import "http://at.alicdn.com/t/font_1651396_rr3dcvloq59.css";
</style>
