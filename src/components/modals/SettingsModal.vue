<template>
    <Modal @close="$emit('close')">
        <h1 class="font-bold text-3xl mb-2">{{ $t("settings.heading") }}</h1>

        <h2 class="font-semibold text-xl mt-2 hidden md:block">{{ $t("settings.setting.navigation") }}</h2>
        <SettingsSelector class="hidden md:flex" :options="['top', 'bottom']" v-model="navigation" />

        <h2 class="font-semibold text-xl mt-2">{{ $t("settings.setting.language") }}</h2>
        <SettingsSelector :options="$i18n.availableLocales" v-model="lang" :lang="true" />
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            navigation: localStorage.getItem("navigation") === "bottom" ? "bottom" : "top",
            lang: localStorage.getItem("lang") || "en",
        };
    },
    watch: {
        navigation(navigation) {
            localStorage.setItem("navigation", navigation);
            this.$nuxt.$emit("navigationTypeChange", navigation);
        },
        lang(lang) {
            localStorage.setItem("lang", lang);
            this.$i18n.locale = lang;
        },
    },
});
</script>
