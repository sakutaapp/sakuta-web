<template>
    <div class="relative min-h-screen pb-64 md:pb-45">
        <Navbar :fixed="navbar" @toggleSettings="settingsModal = true" />
        <nuxt :class="navbar ? 'pt-21' : ''" />
        <Footer />
        <SettingsModal v-if="settingsModal" @close="settingsModal = false" @theme="$event === 'dark' ? theme = true : theme = false" @navbar="$event === 'fixed' ? navbar = true : navbar = false" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            theme: localStorage.getItem("theme") === "dark",
            navbar: localStorage.getItem("navbar") === "fixed",
            settingsModal: false
        }
    },
    head() {
        return {
            bodyAttrs: {
                class: "bg-gray-900 dark:bg-dark-900 text-gray-300"
            },
            htmlAttrs: {
                /// @ts-ignore
                class: this.theme ? "dark" : ""
            }
        };
    }
});
</script>

<style>
anilist-gql-response {
    display: none;
}

::-webkit-scrollbar{
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb{
    background: linear-gradient(0deg, #FF008C 0%,#FF2E82 100%);
    border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover{
    background: #DE0D8A;
}
::-webkit-scrollbar-track{
    background: #1F2937;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}

.dark ::-webkit-scrollbar-track{
    background: #181818;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}
</style>