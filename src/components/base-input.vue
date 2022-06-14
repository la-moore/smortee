<template>
  <div class="py-2">
    <div class="h-8 flex items-center justify-between px-3 space-x-3">
      <label class="block text-xs font-bold text-gray-700">
        {{ label }}
      </label>
      <div
        v-if="type === 'array'"
        class="w-8 h-8 flex justify-center items-center rounded hover:bg-gray-100 cursor-pointer"
        @click="() => localValue.push(defaultValue)"
      >
        <plus-icon class="text-gray-700" />
      </div>
    </div>
    <div class="px-1">
      <select
        v-if="select"
        v-model="localValue"
        class="text-sm appearance-none border border-transparent w-full p-0 h-8 px-2 focus:border-gray-200 outline-none rounded"
      >
        <option :value="undefined">
          Not select
        </option>
        <template
          v-for="(opt, idj) in select"
          :key="idj"
        >
          <option :value="opt.value">
            {{ opt.label }}
          </option>
        </template>
      </select>
      <div
        v-else-if="type === 'array'"
        class="space-y-1"
      >
        <template
          v-for="(opt, idj) in localValue"
          :key="idj"
        >
          <div class="flex pr-2 space-x-1">
            <Popper
              v-if="$slots.popover"
              placement="right"
              offset-distance="0"
              class="flex-1"
            >
              <slot
                name="input"
                v-bind="{ localValue: localValue[idj] }"
              >
                <div
                  v-if="param.itemPopover"
                  class="text-sm appearance-none border border-transparent w-full leading-8 h-8 px-2 focus:border-gray-200 outline-none rounded truncate"
                >
                  {{ localValue[idj] }}
                </div>
                <input
                  v-else
                  v-model="localValue[idj]"
                  placeholder="Click here to edit"
                  class="text-sm appearance-none border border-transparent w-full h-8 px-2 focus:border-gray-200 outline-none rounded"
                >
              </slot>

              <template
                v-if="$slots.popover"
                #content
              >
                <div class="left-20 absolute pointer-events-none">
                  <div class="bg-white border rounded-md pointer-events-auto w-64">
                    <slot
                      name="popover"
                      v-bind="{ localValue: localValue[idj] }"
                    />
                  </div>
                </div>
              </template>
            </Popper>

            <div
              v-if="type === 'array'"
              class="w-8 h-8 flex justify-center flex-shrink-0 items-center rounded hover:bg-gray-100 cursor-pointer"
              @click="() => localValue.splice(idj, 1)"
            >
              <minus-icon class="text-gray-700" />
            </div>
          </div>
        </template>
      </div>
      <input
        v-else
        v-model="localValue"
        placeholder="Click here to edit"
        class="text-sm appearance-none border border-transparent w-full h-8 px-2 focus:border-gray-200 outline-none rounded"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { PlusIcon, MinusIcon } from '@scarlab-icons/vue/outline'
import Popper from 'vue3-popper'

export default defineComponent({
  name: 'IconInput',
  components: {
    Popper,
    PlusIcon,
    MinusIcon,
  },
  props: {
    modelValue: {
      type: [Object, Array],
      required: true
    },
    param: {
      type: Object,
      default: () => ({})
    },
    select: {
      type: Array,
      default: undefined
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: [Object, String],
      default: ''
    },
  },
  emits: ['open-popover', 'update:modelValue'],
  setup(props, ctx) {
    const localValue = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        ctx.emit('update:modelValue', v)
      },
    })

    return {
      localValue
    }
  }
})
</script>
