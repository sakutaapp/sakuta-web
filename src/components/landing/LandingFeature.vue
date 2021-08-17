<template>
    <div class="max-w-112 mx-auto text-center flex flex-col items-center">
        <img :src="`/assets/img/icons8/${feature}.png`" class="h-24">
        <h2 class="font-semibold text-xl">{{ $t(`landing.features.${feature}.title`) }}</h2>
        <p>{{ $t(`landing.features.${feature}.description`) }}</p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        feature: String
    }
});
</script>