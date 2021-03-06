<template>
    <div class="w-full">
        <video ref="videoPlayer" class="video-js vjs-theme-sakuta"></video>
    </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            player: null,
            defaultOptions: {
                autoplay: false,
                controls: true,
                fluid: true,
                controlBar: {
                    remainingTimeDisplay: {
                        displayNegative: true,
                    },
                },
                userActions: {
                    hotkeys: function (event) {
                        // Space or K to play/pause
                        if (event.which === 32 || event.which === 75) {
                            this.playing ? this.pause() : this.play();
                        }

                        // Left or J to jump back 5 seconds
                        if (event.which === 37 || event.which === 74) {
                            this.currentTime(this.currentTime() - 5);
                        }

                        // Right or L to jump forward 5 seconds
                        if (event.which === 39 || event.which === 76) {
                            this.currentTime(this.currentTime() + 5);
                        }

                        // Up or I to increase volume
                        if (event.which === 38 || event.which === 73) {
                            this.volume(this.volume() + 0.1);
                        }

                        // Down or O to decrease volume
                        if (event.which === 40 || event.which === 79) {
                            this.volume(this.volume() - 0.1);
                        }

                        // M to mute/unmute
                        if (event.which === 77) {
                            this.muted(!this.muted());
                        }

                        // F to enter or exit fullscreen
                        if (event.which === 70) {
                            this.fullscreen() ? this.exitFullscreen() : this.requestFullscreen();
                        }
                    },
                },
            },
        };
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, { ...this.defaultOptions, ...this.options }, function onPlayerReady() {});
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>

<style>
.vjs-theme-sakuta {
    --vjs-theme-sakuta--primary: #ff005b;
    --vjs-theme-sakuta--secondary: #fff;
}
.vjs-theme-sakuta.vjs-big-play-button:focus,
.vjs-theme-sakuta:hover .vjs-big-play-button {
    background-color: transparent;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88' fill='%23FF005B'%3E%3Cpath fill-rule='evenodd' d='M44 88C19.738 88 0 68.262 0 44S19.738 0 44 0s44 19.738 44 44-19.738 44-44 44zm0-85C21.393 3 3 21.393 3 44c0 22.608 18.393 41 41 41s41-18.392 41-41C85 21.393 66.607 3 44 3zm16.063 43.898L39.629 60.741a3.496 3.496 0 01-3.604.194 3.492 3.492 0 01-1.859-3.092V30.158c0-1.299.712-2.483 1.859-3.092a3.487 3.487 0 013.604.194l20.433 13.843a3.497 3.497 0 01.001 5.795zm-1.683-3.311L37.946 29.744a.49.49 0 00-.276-.09.51.51 0 00-.239.062.483.483 0 00-.265.442v27.685c0 .262.166.389.265.442.1.053.299.118.515-.028L58.38 44.414A.489.489 0 0058.6 44a.49.49 0 00-.22-.413z'/%3E%3C/svg%3E");
}
.vjs-theme-sakuta .vjs-big-play-button {
    width: 88px;
    height: 88px;
    background: none;
    background-repeat: no-repeat;
    background-position: 50%;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88' fill='%23fff'%3E%3Cpath fill-rule='evenodd' d='M44 88C19.738 88 0 68.262 0 44S19.738 0 44 0s44 19.738 44 44-19.738 44-44 44zm0-85C21.393 3 3 21.393 3 44c0 22.608 18.393 41 41 41s41-18.392 41-41C85 21.393 66.607 3 44 3zm16.063 43.898L39.629 60.741a3.496 3.496 0 01-3.604.194 3.492 3.492 0 01-1.859-3.092V30.158c0-1.299.712-2.483 1.859-3.092a3.487 3.487 0 013.604.194l20.433 13.843a3.497 3.497 0 01.001 5.795zm-1.683-3.311L37.946 29.744a.49.49 0 00-.276-.09.51.51 0 00-.239.062.483.483 0 00-.265.442v27.685c0 .262.166.389.265.442.1.053.299.118.515-.028L58.38 44.414A.489.489 0 0058.6 44a.49.49 0 00-.22-.413z'/%3E%3C/svg%3E");
    border: none;
    top: 50%;
    left: 50%;
    margin-top: -44px;
    margin-left: -44px;
    color: #ff005b;
}
.vjs-theme-sakuta .vjs-big-play-button .vjs-icon-placeholder {
    display: none;
}
.vjs-theme-sakuta .vjs-button > .vjs-icon-placeholder:before {
    line-height: 1.55;
}
.vjs-theme-sakuta .vjs-control:not(.vjs-disabled):not(.vjs-time-control):hover {
    color: var(--vjs-theme-sakuta--primary);
    text-shadow: var(--vjs-theme-sakuta--secondary) 1px 0 10px;
}
.vjs-theme-sakuta .vjs-control-bar {
    background: none;
    margin-bottom: 1em;
    padding-left: 1em;
    padding-right: 1em;
}
.vjs-theme-sakuta .vjs-play-control {
    font-size: 0.8em;
}
.vjs-theme-sakuta .vjs-play-control .vjs-icon-placeholder:before {
    background-color: var(--vjs-theme-sakuta--secondary);
    height: 1.5em;
    width: 1.5em;
    margin-top: 0.2em;
    border-radius: 1em;
    color: var(--vjs-theme-sakuta--primary);
}
.vjs-theme-sakuta .vjs-play-control:hover .vjs-icon-placeholder:before {
    background-color: var(--vjs-theme-sakuta--primary);
    color: var(--vjs-theme-sakuta--secondary);
}
.vjs-theme-sakuta .vjs-mute-control {
    display: none;
}
.vjs-theme-sakuta .vjs-volume-panel {
    margin-left: 0.5em;
    margin-right: 0.5em;
    padding-top: 0.3em;
}
.vjs-theme-sakuta .vjs-volume-bar.vjs-slider-horizontal,
.vjs-theme-sakuta .vjs-volume-panel,
.vjs-theme-sakuta .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active,
.vjs-theme-sakuta .vjs-volume-panel.vjs-volume-panel-horizontal:hover,
.vjs-theme-sakuta .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal,
.vjs-theme-sakuta .vjs-volume-panel:hover,
.vjs-theme-sakuta .vjs-volume-panel:hover .vjs-volume-control.vjs-volume-horizontal {
    width: 3em;
}
.vjs-theme-sakuta .vjs-volume-level:before {
    font-size: 1em;
}
.vjs-theme-sakuta .vjs-volume-panel .vjs-volume-control {
    opacity: 1;
    width: 100%;
    height: 100%;
}
.vjs-theme-sakuta .vjs-volume-bar {
    background-color: transparent;
    margin: 0;
}
.vjs-theme-sakuta .vjs-slider-horizontal .vjs-volume-level {
    height: 100%;
}
.vjs-theme-sakuta .vjs-volume-bar.vjs-slider-horizontal {
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
}
.vjs-theme-sakuta .vjs-volume-bar:before {
    content: "";
    z-index: 0;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    border-left: 3em solid transparent;
    border-bottom: 2em solid var(--vjs-theme-sakuta--primary);
    border-right: 0 solid transparent;
    border-top: 0 solid transparent;
}
.vjs-theme-sakuta .vjs-volume-level {
    overflow: hidden;
    background-color: transparent;
}
.vjs-theme-sakuta .vjs-volume-level:before {
    content: "";
    z-index: 1;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    border-left: 3em solid transparent;
    border-bottom: 2em solid var(--vjs-theme-sakuta--secondary);
    border-right: 0 solid transparent;
    border-top: 0 solid transparent;
}
.vjs-theme-sakuta .vjs-progress-control:hover .vjs-progress-holder {
    font-size: 1.5em;
}
.vjs-theme-sakuta .vjs-play-progress:before {
    display: none;
}
.vjs-theme-sakuta .vjs-progress-holder {
    border-radius: 0.2em;
    height: 0.4em;
    margin: 0;
    background-color: rgba(255, 255, 255, 0.1);
}
.vjs-theme-sakuta .vjs-load-progress,
.vjs-theme-sakuta .vjs-load-progress div,
.vjs-theme-sakuta .vjs-play-progress {
    border-radius: 0.2em;
}

.vjs-theme-sakuta .vjs-load-progress div {
    background-color: rgba(255, 255, 255, 0.3);
}

.vjs-theme-sakuta .vjs-play-progress {
    background-color: var(--vjs-theme-sakuta--primary);
}
</style>
