<template>
    <Container class="mt-5">
        <h1 class="text-3xl font-bold mb-1">{{ $t("imprint.heading") }}</h1>
        <h2 class="text-xl font-semibold mb-3">{{ $t("imprint.accordingTo") }}</h2>
        <p class="font-semibold">{{ $t("imprint.responsible") }}</p>
        <p>
            Dennis Paulus<br />
            Voerder Straße 99 ({{ $t("imprint.rearBuilding") }})<br />
            58135 Hagen<br />
            {{ $t("imprint.germany") }}
        </p>
        <p class="mt-1"><b>E-Mail:</b> hello@crugg.de</p>

        <h1 class="text-2xl font-bold mb-2 mt-10">{{ $t("imprint.disclaimers") }}</h1>
        <div v-for="disclaimer in disclaimers" :key="disclaimer" class="mb-5">
            <h2 class="text-lg font-semibold mb-1">{{ $t(`imprint.disclaimers.${disclaimer}.heading`) }}</h2>
            <p>{{ $t(`imprint.disclaimers.${disclaimer}.text`) }}</p>
            <p class="italic mt-1">{{ $t(`imprint.disclaimers.${disclaimer}.tldr`) }}</p>
        </div>
    </Container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    head: {
        title: "Imprint",
    },
    data() {
        return {
            disclaimers: ["content", "links"],
        };
    },
});
</script>
