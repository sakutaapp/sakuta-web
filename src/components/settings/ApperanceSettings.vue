<template>
    <div class="flex flex-col space-y-2">
        <ToggleSetting name="bottomNavigation" :description="true" :active="bottomNavigation" @toggle="bottomNavigation = !bottomNavigation" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            bottomNavigation: localStorage.getItem("navigation") === "bottom",
        };
    },
    watch: {
        bottomNavigation(bottomNavigation) {
            localStorage.setItem("navigation", bottomNavigation ? "bottom" : "top");
            this.$nuxt.$emit("navigationTypeChange", bottomNavigation ? "bottom" : "top");
        },
    },
});
</script>
