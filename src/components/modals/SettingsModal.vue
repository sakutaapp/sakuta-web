<template>
    <Modal @close="$emit('close')">
        <h1 class="font-bold text-3xl mb-2">{{ $t("settings.heading") }}</h1>

        <h2 class="font-semibold text-xl mt-2">{{ $t("settings.setting.theme") }}</h2>
        <SettingsSelector :options="['blue', 'dark']" v-model="theme" />

        <h2 class="font-semibold text-xl mt-2">{{ $t("settings.setting.homePage") }}</h2>
        <SettingsSelector :options="['landing', 'explore']" v-model="homePage" />

        <h2 class="font-semibold text-xl mt-2">{{ $t("settings.setting.navbar") }}</h2>
        <SettingsSelector :options="['fixed', 'unfixed']" v-model="navbar" />

        <h2 class="font-semibold text-xl mt-2">{{ $t("settings.setting.language") }}</h2>
        <SettingsSelector :options="$i18n.availableLocales" v-model="lang" :lang="true" />
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            theme: localStorage.getItem("theme") === "dark" ? localStorage.getItem("theme") : "blue",
            homePage: localStorage.getItem("homePage") === "explore" ? localStorage.getItem("homePage") : "landing",
            navbar: localStorage.getItem("navbar") === "fixed" ? localStorage.getItem("navbar") : "unfixed",
            lang: localStorage.getItem("lang") || "en"
        }
    },
    watch: {
        theme(theme) {
            localStorage.setItem("theme", theme);
            this.$emit("theme", theme);
        },
        homePage(homePage) {
            localStorage.setItem("homePage", homePage);
        },
        navbar(navbar) {
            localStorage.setItem("navbar", navbar);
            this.$emit("navbar", navbar);
        },
        lang(lang) {
            localStorage.setItem("lang", lang);
            this.$i18n.locale = lang;
        }
    }
});
</script>