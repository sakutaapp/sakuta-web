<template>
    <div :class="`bg-gray-800 dark:bg-dark-800 shadow-sm py-4 mb-5 ${ fixed ? 'fixed fixed-navbar backdrop-filter backdrop-blur-lg w-full z-90 border-b shadow border-gray-900 dark:border-black' : '' }`">
        <Container>
            <div class="flex items-center">
                <div class="flex-grow w-1/5 text-left">
                    <nuxt-link to="/"><img src="/assets/svg/logo.svg" class="h-8" /></nuxt-link>
                </div>
                <div class="w-full flex-grow flex justify-center items-center space-x-4">
                    <nuxt-link exact-active-class="text-white bg-opacity-12 hover:bg-opacity-18" v-for="link in nav" :key="link.to" :to="link.to" class="hover:text-white transition duration-250 bg-white bg-opacity-0 hover:bg-opacity-5 px-2.5 py-1 rounded">{{ $t(`nav.link.${link.name}`) }}</nuxt-link>
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
            navLinks: [
                {
                    to: "/",
                    name: "home"
                },
                {
                    to: "/explore",
                    name: "explore"
                },
                {
                    to: "/anime/101291",
                    name: "exampleAnime"
                }
            ]
        }
    },
    computed: {
        nav(): any {
            if(localStorage.getItem("homePage") !== "explore") return this.navLinks;
            return this.navLinks.filter(link => link.name !== "home");
        }
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