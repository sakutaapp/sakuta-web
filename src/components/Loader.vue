<template>
    <div id="loader" :class="`${loading ? `flex loader-intro` : 'hidden'} flex-col items-center justify-center space-y-10 bg-gray-900 dark:bg-dark-900 fixed top-0 left-0 h-screen w-screen z-500 transition duration-500 ${startFadeOut ? 'opacity-0' : ''} select-none`">
        <img src="/assets/svg/icon_white.svg" class="h-42 w-42 pageLoader" />
        <div class="relative w-full text-center">
            <h1 class="text-xl">{{ $t(loadingText) }}</h1>
            <p :class="`w-full absolute top-15 ${tooLong ? 'opacity-100' : 'opacity-0'} transition duration-100`">Loading takes longer than usual...<br />If this issue persists, send a tweet to <a href="https://twitter.com/trysakuta">@trysakuta</a>!</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            loading: false,
            startFadeOut: false,
            loadingText: "",
            tooLong: false,
        };
    },
    methods: {
        start() {
            this.loading = true;
            let strings = Object.keys(this.$i18n.messages.en).filter((string) => {
                return string.startsWith("loading.");
            });
            let randomIndex = Math.floor(Math.random() * strings.length);
            this.loadingText = strings[randomIndex];

            setTimeout(() => {
                this.tooLong = true;
            }, 8000);
        },
        finish() {
            this.tooLong = false;
            setTimeout(() => {
                this.startFadeOut = true;
                setTimeout(() => {
                    console.log(2);
                    this.loading = false;
                    this.startFadeOut = false;
                }, 500);
            }, 500);
        },
    },
});
</script>

<style>
.pageLoader {
    animation: pageLoader 1s infinite cubic-bezier(0, 0.02, 0.47, 0.995) alternate;
}

.loader-intro {
    animation: loaderAnim 100ms ease;
}

@keyframes pageLoader {
    0% {
        transform: scale(100%);
    }
    90% {
        transform: scale(110%);
    }
    100% {
        transform: scale(110%);
    }
}

@keyframes loaderAnim {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
