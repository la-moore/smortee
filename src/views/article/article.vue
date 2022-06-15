<template>
  <div class="min-h-screen flex">
    <div class="hidden md:block flex-shrink-0 w-64 border-r bg-gray-100">
      <div class="sticky top-0 py-12">
        <nav
          class="space-y-1 px-2"
          aria-label="Sidebar"
        >
          <template
            v-for="(item, idx) in toc"
            :key="idx"
          >
            <a
              :href="`#${item.href}`"
              class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
            >
              <span class="truncate">
                {{ item.text }}
              </span>
            </a>
          </template>

          <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
          <!--          <a href="#" class="bg-gray-100 text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md" aria-current="page">-->
          <!--            <span class="truncate"> Dashboard </span>-->
          <!--          </a>-->
        </nav>
      </div>
    </div>

    <main class="flex-1 w-0">
      <div class="max-w-7xl mx-auto py-12 px-6">
        <div
          class="prose max-w-5xl mx-auto w-full"
          v-html="md"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { markdownIt } from '/~/plugins/markdown'
import { kebab } from '/~/helpers/text-transform'
import { reader } from '/~/helpers/reader'

const content = ref<any>('')

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
      return markdownIt.render(content.value)
    })
    const toc = computed(() => {
      return content.value.match(/^(#{1,6})\s.+$/gm)
        .map((v) => {
          const m = v.match(/^(#{1,6})\s(.+)$/m)

          return {
            raw: m[0],
            level: m[1].length,
            href: kebab(m[2].toLowerCase()),
            text: m[2],
          }
        })
        .filter((v) => v.level === 2)
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
