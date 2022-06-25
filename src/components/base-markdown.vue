<template>
  <div
    class="prose"
    v-html="md"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import { markdownIt } from '~/plugins/markdown'

export default defineComponent({
  name: 'BaseMarkdown',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const text = toRef(props, 'text')

    const md = computed(() => {
      return markdownIt.render(text.value)
    })

    return {
      md
    }
  }
})
</script>
