<template>
  <div class="flex flex-col space-y-2">
    <ToggleSetting name="bottomNavigation" :description="true" :active="bottomNavigation" @toggle="bottomNavigation = !bottomNavigation" />
    <ToggleSetting name="singleActivities" :description="true" :active="singleActivities" @toggle="singleActivities = !singleActivities" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      bottomNavigation: localStorage.getItem("sakuta_setting_navigation") === "bottom",
      singleActivities: localStorage.getItem("sakuta_setting_singleActivities") === "true",
    };
  },
  watch: {
    bottomNavigation(bottomNavigation) {
      localStorage.setItem("sakuta_setting_navigation", bottomNavigation ? "bottom" : "top");
      this.$nuxt.$emit("navigationTypeChange", bottomNavigation ? "bottom" : "top");
    },
    singleActivities(singleActivities) {
      localStorage.setItem("sakuta_setting_singleActivities", singleActivities ? "true" : "false");
      this.$nuxt.$emit("singleActivitiesChange", singleActivities ? "true" : "false");
    },
  },
});
</script>
