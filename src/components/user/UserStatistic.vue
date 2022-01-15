<template>
    <div class="whitespace-nowrap md:whitespace-normal">
        <p class="text-gray-400 text-xs font-semibold uppercase">{{ $t(`user.stats.${prop}.title`) }}</p>
        <p class="text-gray-300">{{ value }}</p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        prop: String,
        value: String,
    },
});
</script>
