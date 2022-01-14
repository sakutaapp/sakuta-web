<template>
    <div class="relative min-h-screen pb-64 md:pb-45 caret-primary">
        <Navbar :fixed="navbar" @toggleSettings="settingsModal = true" @toggle-command-menu="toggleCommandMenu()" />
        <nuxt :class="navbar ? 'pt-21' : ''" />
        <Footer />
        <SettingsModal v-if="settingsModal" @close="settingsModal = false" @theme="$event !== 'deep-pink' ? (theme = true) : (theme = false)" @navbar="$event === 'fixed' ? (navbar = true) : (navbar = false)" />
        <DevPageWarning v-if="showPageWarning && !isMainSite" @continue="closeDevPageWarning()" />
        <transition name="command-menu-transition">
            <CommandMenu v-if="commandMenuEnabled" @close="commandMenuEnabled = false" />
        </transition>
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
            commandMenuEnabled: false,
        };
    },
    methods: {
        closeDevPageWarning() {
            localStorage.setItem("continue", "true");
            this.showPageWarning = false;
        },
        toggleCommandMenu() {
            this.commandMenuEnabled = !this.commandMenuEnabled;
        },
    },
    mounted() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleCommandMenu();
            }
        });
    },
    computed: {
        isMainSite() {
            return document.location.hostname === "sakuta.app";
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

.command-menu-transition-enter-active {
    animation: command-menu-transition 0.1s ease-out;
}

.command-menu-transition-leave-active {
    animation: command-menu-transition 0.1s ease-out reverse;
}

@keyframes command-menu-transition {
    from {
        transform: scale(0.8);
        opacity: 0;
        filter: blur(15px);
    }
    to {
        transform: scale(1);
        opacity: 1;
        filter: blur(0);
    }
}

/*
.command-menu-transition-enter-active,
.command-menu-transition-leave-active {
    transition: all 0.5s;
}
.command-menu-transition-enter,
.command-menu-transition-leave-to {
    transform: scale(50%);
}
*/
</style>
