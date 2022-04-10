<template>
    <div @click="$emit('pageswitch', page.name)" :class="`flex items-center cursor-pointer space-x-7 md:space-x-3 transition duration-250 ${active ? 'md:g-dark-800' : 'bg-dark-900'} hover:md:bg-dark-800 rounded-full py-2.5 md:py-1.5 md:px-4 md:pr-14`">
        <Component class="hidden md:block" :is="page.icon" :filled="active" />
        <Component class="md:hidden" :is="page.icon" :filled="false" />
        <span class="text-lg md:text-base">{{ $t(`settings.page.${page.name}`) }}</span>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        page: {
            type: Object,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
