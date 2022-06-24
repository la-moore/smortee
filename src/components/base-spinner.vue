<template>
  <div
    class="inline-block relative"
  >
    <slot>
      <svg
        class="w-full h-full animate-spin duration-[2s] opacity-75"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          class="path"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
        />
      </svg>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseSpinner'
})
</script>

<style>
.path {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -65;
  }
}

</style>
