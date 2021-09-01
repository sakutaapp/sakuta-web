<template>
    <div class="relative min-h-screen pb-64 md:pb-45">
        <Navbar :fixed="navbar" @toggleSettings="settingsModal = true" />
        <nuxt :class="navbar ? 'pt-21' : ''" />
        <Footer />
        <SettingsModal v-if="settingsModal" @close="settingsModal = false" @theme="$event !== 'deep-pink' ? (theme = true) : (theme = false)" @navbar="$event === 'fixed' ? (navbar = true) : (navbar = false)" />
        <DevPageWarning v-if="showPageWarning" @continue="closeDevPageWarning()" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            theme: localStorage.getItem("theme") !== "deep-pink",
            navbar: localStorage.getItem("navbar") === "fixed",
            settingsModal: false,
            showPageWarning: localStorage.getItem("continue") !== "true",
        };
    },
    methods: {
        closeDevPageWarning() {
            localStorage.setItem("continue", "true");
            this.showPageWarning = false;
        },
    },
    head() {
        return {
            titleTemplate: "%s | Sakuta",
            bodyAttrs: {
                class: "bg-gray-900 dark:bg-dark-900 text-gray-300",
            },
            htmlAttrs: {
                /// @ts-ignore
                class: this.theme ? "dark" : "",
            },
        };
    },
});
</script>

<style>
anilist-gql-response {
    display: none;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb {
    background: linear-gradient(0deg, #ff008c 0%, #ff2e82 100%);
    border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover {
    background: #de0d8a;
}
::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #f0f0f0;
}

.dark ::-webkit-scrollbar-track {
    background: #181818;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #f0f0f0;
}
</style>
