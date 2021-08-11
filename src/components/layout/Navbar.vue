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
                <div class="flex-grow w-1/5 flex justify-end">
                    <svg class="w-6 h-6 cursor-pointer" @click="$emit('toggleSettings')" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
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