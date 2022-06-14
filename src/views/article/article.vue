<template>
  <main class="max-w-7xl mx-auto py-12 px-6">
    <div
      class="prose max-w-full"
      v-html="md"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { marked } from 'marked'

const content = ref<any>('')
const reader = (data) => new Promise((resolve) => {
  const reader = new FileReader()

  reader.readAsText(data)

  reader.addEventListener('loadend', function(e){
    resolve(e.target.result)
  })
})

export default defineComponent({
  name: 'HomeView',
  async beforeRouteEnter(to, from, next) {
    const data = await fetch(`/articles/${to.params.id}.md`).then(response => response.blob())

    content.value = await reader(data)

    next()
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const md = computed(() => {
      return marked.parse(content.value)
    })
    const toc = computed(() => {
      return ''
    })

    onMounted(async () => {
      const data = await fetch(`/articles/${props.id}.md`).then(response => response.blob())
      const reader = new FileReader()

      reader.readAsText(data)

      reader.addEventListener('loadend', function(e){
        content.value = e.target.result
      })
    })

    return {
      md,
      toc
    }
  }
})
</script>
