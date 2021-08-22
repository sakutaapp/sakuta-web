<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black bg-opacity-60 backdrop-filter backdrop-blur-md z-90 flex justify-end sidebar-container" @click.self="$emit('close')">
        <div class="h-full bg-gray-900 dark:bg-dark-900 w-8/10 max-w-78 flex flex-col items-end p-5 text-right transition duration-250">
            <div class="flex items-start justify-between">
                <nuxt-link to="/" class="w-4/6 mb-5"><img src="/assets/svg/logo.svg" class="w-full"/></nuxt-link>
                <CloseButton @close="$emit('close')" />
            </div>
            <nuxt-link exact-active-class="text-white bg-opacity-15 hover:bg-opacity-20" v-for="link in links" :key="link.to" :to="link.to" class="hover:text-white transition duration-250 bg-white bg-opacity-0 hover:bg-opacity-5 px-2.5 py-1 rounded">{{ $t(`nav.link.${link.name}`) }}</nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        links: Array,
    },
});
</script>
