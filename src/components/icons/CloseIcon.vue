<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2">
        <g transform="matrix(2.32558,0,0,2.32558,-15.907,-15.907)">
            <path d="M16,14.6C16.4,15 16.4,15.6 16,16C15.8,16.2 15.6,16.3 15.3,16.3C15,16.3 14.8,16.2 14.6,16L12,13.4L9.4,16C9.2,16.2 8.9,16.3 8.7,16.3C8.4,16.3 8.2,16.2 8,16C7.6,15.6 7.6,15 8,14.6L10.6,12L8,9.4C7.6,9 7.6,8.4 8,8C8.4,7.6 9,7.6 9.4,8L12,10.6L14.6,8C15,7.6 15.6,7.6 16,8C16.4,8.4 16.4,9 16,9.4L13.4,12L16,14.6Z" fill="currentColor" />
        </g>
    </svg>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        size: {
            type: String,
            default: "24",
        },
    },
});
</script>
