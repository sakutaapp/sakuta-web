<template>
    <div class="rounded shadow bg-gray-900 dark:bg-dark-900 py-1 px-2 hover:pl-3 cursor-pointer transition-all duration-250 flex items-center whitespace-nowrap md:whitespace-normal">
        <p :class="`w-full flex-grow ${ spoiler ? 'text-red-500' : '' }`">{{ text }}</p>
        <p v-if="rank" class="text-xs text-gray-500 pl-2">{{ rank }}%</p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        text: String,
        rank: String,
        spoiler: Boolean
    }
});
</script>