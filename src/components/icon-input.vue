<template>
  <div class="text-sm cursor-pointer border border-transparent w-full leading-8 h-8 px-2 hover:border-gray-200 outline-none rounded truncate">
    <div class="flex h-full items-center space-x-2">
      <div
        class="w-6 h-6 bg-contain bg-center shadow-inner-border rounded-md"
        :style="{ backgroundImage: `url(${item.src})` }"
      />
      <div class="truncate">
        {{ item.sizes }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconInput',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
})
</script>
