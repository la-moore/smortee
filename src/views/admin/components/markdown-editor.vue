<template>
  <div>
    <div class="flex justify-between">
      <label
        for="description"
        class="block text-sm font-medium text-gray-700"
      >
        {{ label }}
      </label>
      <div
        class="cursor-pointer"
        @click="preview = !preview"
      >
        <svg
          v-if="preview"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
    </div>

    <div class="mt-1">
      <div
        v-if="preview"
        class="bg-white rounded-md border p-6"
      >
        <base-markdown
          class="max-w-4xl w-full mx-auto pb-12"
          :text="modelValue"
        />
      </div>

      <div
        v-else
        class="shadow-sm overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
      >
        <codemirror
          v-model="localValue"
          placeholder="Code goes here..."
          :style="{ height: 'auto' }"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef, ref } from 'vue'
import { keymap } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { Codemirror } from 'vue-codemirror'
import { markdownIt } from '~/plugins/markdown'
import uppercase from '~/plugins/codemirror/uppercase'
import theme from '~/plugins/codemirror/theme'
import BaseMarkdown from '~/components/base-markdown.vue'

export default defineComponent({
  name: 'MarkdownEditor',
  components: {
    BaseMarkdown,
    Codemirror
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const value = toRef(props, 'value')
    const modelValue = toRef(props, 'modelValue')
    const preview = ref(false)
    const localValue = computed({
      get() {
        return modelValue.value || value.value
      },
      set(v) {
        ctx.emit('update:modelValue', v)
      },
    })

    const extensions = [
      markdown(),
      theme,
      keymap.of([uppercase]),
    ]

    const md = computed(() => {
      return markdownIt.render(localValue.value)
    })

    return {
      md,
      preview,
      extensions,
      localValue
    }
  }
})
</script>
