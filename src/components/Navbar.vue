<template>
    <div :class="`bg-gray-800 dark:bg-dark-800 shadow-sm py-4 mb-5 ${ fixed ? 'fixed fixed-navbar backdrop-filter backdrop-blur-lg w-full z-90 border-b shadow border-gray-900 dark:border-black' : '' }`">
        <Container>
            <div class="flex items-center">
                <div class="flex-grow w-1/5 text-left">
                    <nuxt-link to="/"><img src="/assets/svg/logo.svg" class="h-8" /></nuxt-link>
                </div>
                <div class="w-full flex-grow flex justify-center items-center space-x-6">
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/search">Search</nuxt-link>
                    <nuxt-link to="/anime/101291">Example Anime</nuxt-link>
                </div>
                <div class="flex-grow w-1/5 text-right">
                </div>
            </div>
        </Container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        fixed: Boolean
    },
    data() {
        return {
        }
    },
    computed: {
    }
});
</script>

<style>
.fixed-navbar {
    background-color: rgba(17,24,39,.8)!important;
}
.dark .fixed-navbar {
    background-color: rgba(15,15,15,.8)!important;
}
</style>