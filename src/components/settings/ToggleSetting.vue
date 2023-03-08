<template>
  <div>
    <div class="hidden md:block flex flex-col">
      <div class="flex items-center justify-between cursor-pointer" @click="handleToggle()">
        <p class="text-white font-medium">
          {{ $t(`settings.options.${name}`) }}
        </p>
        <div :class="`${active ? 'bg-primary' : 'bg-dark-900 bg-opacity-50'} h-7 w-12 rounded-full relative transition duration-250`">
          <div :class="`absolute ${animate ? 'animate' : ''} ${active ? 'on' : 'off'} h-5 bg-white rounded-full`" />
        </div>
      </div>
      <p v-if="description" class="text-sm opacity-50">
        {{ $t(`settings.options.${name}.description`) }}
      </p>
    </div>
    <div class="md:hidden flex items-center" @click="handleToggle()">
      <div class="flex flex-col justify-between cursor-pointer flex-shrink">
        <p class="text-white font-medium">
          {{ $t(`settings.options.${name}`) }}
        </p>
        <p v-if="description" class="text-sm opacity-50">
          {{ $t(`settings.options.${name}.description`) }}
        </p>
      </div>
      <div
        :class="`${
          active ? 'bg-primary' : 'bg-dark-800 bg-opacity-100'
        } h-7 w-12 min-w-12 rounded-full relative transition duration-250 flex-grow`"
      >
        <div :class="`absolute ${animate ? 'animate' : ''} ${active ? 'on' : 'off'} h-5 bg-white rounded-full`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data(): { animate: boolean; animateTimeout: any } {
    return {
      animate: false,
      animateTimeout: undefined,
    };
  },
  methods: {
    handleToggle() {
      this.$emit("toggle");
      this.animate = true;
      if (this.animateTimeout) {
        clearTimeout(this.animateTimeout);
      }
      this.animateTimeout = setTimeout(() => {
        this.animate = false;
      }, 400);
    },
  },
});
</script>

<style lang="postcss" scoped>
.on {
  left: 1.5rem;
  top: 0.25rem;
  width: 1.25rem;
}
.off {
  left: 0.25rem;
  top: 0.25rem;
  width: 1.25rem;
}
.animate.on {
  animation: turningOn 0.25s cubic-bezier(0, 0.5, 0.5, 1);
}
.animate.off {
  animation: turningOff 0.25s cubic-bezier(0, 0.5, 0.5, 1);
}

@keyframes turningOn {
  0% {
    left: 0.25rem;
    width: 1.25rem;
    filter: blur(0px);
  }
  50% {
    left: 0.625rem;
    width: 2rem;
    filter: blur(1px);
  }
  100% {
    left: 1.5rem;
    width: 1.25rem;
    filter: blur(0px);
  }
}

@keyframes turningOff {
  0% {
    left: 1.5rem;
    width: 1.25rem;
    filter: blur(0px);
  }
  50% {
    left: 0.625rem;
    width: 2rem;
    filter: blur(1px);
  }
  100% {
    left: 0.25rem;
    width: 1.25rem;
    filter: blur(0px);
  }
}
</style>
