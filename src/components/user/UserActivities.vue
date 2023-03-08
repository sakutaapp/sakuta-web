<template>
  <Section>
    <h2 class="text-lg font-semibold mb-1">
      {{ $t("user.section.activity") }}
    </h2>
    <div class="grid grid-cols-2 gap-2">
      <UserActivity v-for="activity in previousActivities" :key="activity.id" :activity="activity" />
      <div id="scroll-sensor" />
      <UserActivity v-for="activity in activities" :key="activity.id" :activity="activity" />
    </div>
  </Section>
</template>

<script lang="ts">
import Vue from "vue";
/// @ts-ignore
import scrollMonitor from "scrollmonitor";

export default Vue.extend({
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      previousActivities: [],
    };
  },
  watch: {
    activities: {
      deep: true,
      handler(_newValue, oldValue) {
        if (oldValue === undefined) {
          /// @ts-ignore
          this.previousActivities = this.activities;
          this.$emit("fetch");
          const scrollSensor = document.getElementById("scroll-sensor");
          if (!scrollSensor) return;
          const elementWatcher = scrollMonitor.create(scrollSensor);
          elementWatcher.enterViewport(() => {
            if (window.scrollY > 0) {
              this.fetchMore();
              console.log(1);
            }
          }, false);
        }
      },
    },
  },
  methods: {
    fetchMore(): any {
      /// @ts-ignore
      this.previousActivities = [...this.previousActivities, ...this.activities];
      this.$emit("fetch");
    },
  },
});
</script>
