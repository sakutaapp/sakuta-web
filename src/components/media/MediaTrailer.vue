<template>
    <Section class="hidden md:block">
        <h2 class="text-lg font-semibold">{{ $t("media.section.trailer") }}</h2>
        <iframe class="w-full" :src="`https://www.youtube-nocookie.com/embed/${trailer}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        trailer: String,
    },
});
</script>
