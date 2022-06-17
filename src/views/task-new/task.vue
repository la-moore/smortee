<template>
  <main class="max-w-7xl mx-auto py-12 px-6">
    <div class="prose max-w-5xl mx-auto w-full mb-12">
      <h1>
        {{ task?.name }}
      </h1>
    </div>
    <div
      class="prose max-w-5xl mx-auto w-full"
      v-html="md"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { markdownIt } from '/~/plugins/markdown'
import { useTasks } from '/~/state/tasks'

const task = ref<any>(undefined)

export default defineComponent({
  name: 'TaskView',
  async beforeRouteEnter(to, from, next) {
    const { fetchTask } = useTasks()

    task.value = await fetchTask(`${to.params.id}`)

    next()
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup() {
    const md = computed(() => {
      return markdownIt.render(task.value?.text)
    })
    const toc = computed(() => {
      return ''
    })

    return {
      md,
      toc,
      task
    }
  }
})
</script>
