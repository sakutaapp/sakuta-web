<template>
    <Section class="overflow-x-scroll md:overflow-hidden">
        <h2 class="text-lg font-semibold mb-1">{{ $t("media.section.tags") }}</h2>
        <div class="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1">
            <p class="text-gray-500 text-sm cursor-pointer" @click="showSpoilers = !showSpoilers">{{ $t("media.tags.toggleSpoilers") }}</p>
        </div>
    </Section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        tags: Array,
    },
});
</script>