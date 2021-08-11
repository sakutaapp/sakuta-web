<template>
    <Modal @close="$emit('close')">
        <h1 class="font-bold text-3xl mb-2">{{ $t("settings.heading") }}</h1>

        <h2 class="font-semibold text-xl">{{ $t("settings.setting.theme") }}</h2>
        <SettingsSelector :options="['blue', 'dark']" v-model="theme" />

        <h2 class="font-semibold text-xl">{{ $t("settings.setting.homePage") }}</h2>
        <SettingsSelector :options="['landing', 'explore']" v-model="homePage" />

        <h2 class="font-semibold text-xl">{{ $t("settings.setting.navbar") }}</h2>
        <SettingsSelector :options="['fixed', 'unfixed']" v-model="navbar" />
    </Modal>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            theme: localStorage.getItem("theme") === "dark" ? localStorage.getItem("theme") : "blue",
            homePage: localStorage.getItem("homePage") === "explore" ? localStorage.getItem("homePage") : "landing",
            navbar: localStorage.getItem("navbar") === "fixed" ? localStorage.getItem("navbar") : "unfixed"
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
        }
    }
});
</script>