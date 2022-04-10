<template>
    <div :class="`pointer-events-none fixed w-full bottom-5 left-0 z-100 flex justify-center ${alwaysShow ? '' : 'md:hidden'}`">
        <div class="bg-dark-800 flex justify-around items-center py-2 text-white space-x-4 px-3 rounded-full shadow-2xl pointer-events-auto">
            <nuxt-link to="/" class="opacity-40 nav-bottom-link flex items-center space-x-2 transition duration-250 bg-dark-800 hover:bg-dark-900 rounded-full px-4 py-2">
                <HomeIcon :filled="$route.path === '/'" size="30" />
                <span class="font-medium text-lg hidden md:block">{{ $t("nav.link.home") }}</span>
            </nuxt-link>

            <div class="bg-primary rounded-full p-2 block md:hidden" @click="$emit('toggle-command-menu')"><SearchIcon size="30" :filled="true" /></div>

            <nuxt-link to="/explore" class="opacity-40 nav-bottom-link flex items-center space-x-2 transition duration-250 bg-dark-800 hover:bg-dark-900 rounded-full px-4 py-2">
                <ExploreIcon :filled="$route.path === '/explore'" size="30" />
                <span class="font-medium text-lg hidden md:block">{{ $t("nav.link.explore") }}</span>
            </nuxt-link>
        </div>
    </div>
</template>

<style lang="postcss">
.nav-bottom-link.nuxt-link-exact-active {
    @apply bg-dark-900;
    opacity: 1 !important;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        alwaysShow: {
            type: Boolean,
            default: false,
        },
    },
    data(): { showWip: boolean; timeout: any } {
        return {
            showWip: false,
            timeout: null,
        };
    },
    methods: {
        wipPopup() {
            this.showWip = true;
            this.timeout = setTimeout(() => {
                this.showWip = false;
            }, 2000);
        },
    },
});
</script>
