<template>
  <div class="divide-y">
    <template
      v-for="(param, idx) in params"
      :key="idx"
    >
      <base-input
        v-model="localValue[param.value]"
        :select="param.select"
        :label="param.label"
        :type="param.type"
        :default="param.default"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseInput from '/~/components/base-input.vue'

export default defineComponent({
  name: 'IconPopover',
  components: {
    BaseInput
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: [Object, String],
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const localValue = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        ctx.emit('update:modelValue', v)
      },
    })
    const params = [
      { value: 'sizes', label: 'Sizes' },
      { value: 'src', label: 'Source' },
      { value: 'type', label: 'Type' },
      {
        value: 'purpose',
        label: 'Purpose',
        select: [
          { value: 'any', label: 'Any' },
          { value: 'monochrome', label: 'Monochrome' },
          { value: 'maskable', label: 'Maskable' },
        ]
      },
    ]

    return {
      params,
      localValue
    }
  }
})
</script>
