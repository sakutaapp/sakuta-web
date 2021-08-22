<template>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        <MediaCard v-for="m in media" :key="m.id" :media="m" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        media: Array,
    },
});
</script>
