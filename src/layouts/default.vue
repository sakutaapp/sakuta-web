<template>
  <div class="relative min-h-screen pb-100 md:pb-45 caret-primary">
    <Navigation @toggleSettings="settingsMenu = true" @toggle-command-menu="toggleCommandMenu()" />
    <nuxt />
    <Footer />
    <transition name="settings-menu-transition">
      <SettingsMenu v-if="settingsOpen" />
    </transition>
    <DevPageWarning v-if="showPageWarning && !isMainSite" @continue="closeDevPageWarning()" />
    <transition name="command-menu-transition">
      <CommandMenu v-if="commandMenuOpen" :search-only="commandMenuSearchOnly" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      showPageWarning: localStorage.getItem("continue") !== "true",
      commandMenuSearchOnly: false,
    };
  },
  head() {
    return {
      titleTemplate: "%s | Sakuta",
      bodyAttrs: {
        class: "bg-dark-900 text-gray-300",
      },
    };
  },
  computed: {
    isMainSite() {
      return document.location.hostname === "sakuta.app";
    },
    settingsOpen() {
      return this.$store.state.settings.open;
    },
    commandMenuOpen() {
      return this.$store.state.commandMenu.open;
    },
    scrollAllowed() {
      return this.$store.state.scroll.allowed;
    },
  },
  watch: {
    settingsOpen(settingsMenu) {
      settingsMenu ? this.$store.commit("scroll/disallow") : this.$store.commit("scroll/allow");
    },
    scrollAllowed() {
      if (this.scrollAllowed) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-hidden");
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.commandMenuSearchOnly = false;
        this.$store.commit("commandMenu/open");
      }
    });
    this.$nuxt.$on("goHome", () => {
      console.log("goHome triggered");
      this.$router.push("/");
    });
    this.$nuxt.$on("openSearch", () => {
      this.commandMenuSearchOnly = true;
      // this.commandMenuEnabled = true;
    });
  },
  methods: {
    closeDevPageWarning() {
      localStorage.setItem("continue", "true");
      this.showPageWarning = false;
    },
  },
});
</script>

<style lang="postcss">
.center {
  @apply flex items-center justify-center;
}

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
  background: none;
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

.settings-menu-transition-enter-active {
  animation: settings-menu-transition-mobile 0.25s ease-out;
}

.settings-menu-transition-leave-active {
  animation: settings-menu-transition-mobile 0.25s ease-out reverse;
}

@media (min-width: 768px) {
  .settings-menu-transition-enter-active {
    animation: settings-menu-transition 0.25s ease-out;
  }

  .settings-menu-transition-leave-active {
    animation: settings-menu-transition 0.25s ease-out reverse;
  }
}

@keyframes settings-menu-transition {
  from {
    transform: scale(1.1);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes settings-menu-transition-mobile {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
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
