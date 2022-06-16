<template>
  <div class="min-h-screen md:flex">
    <div class="flex-shrink-0 md:w-64 md:h-screen md:border-r bg-gray-100 sticky top-0">
      <div class="pb-4">
        <div class="h-14 flex items-center px-5">
          <base-logo class="h-8" />
        </div>

        <nav
          ref="navigation"
          class="space-y-1 px-2 flex flex-row md:flex-col overflow-y-auto"
        >
          <template
            v-for="(item, idx) in toc"
            :key="idx"
          >
            <a
              :href="`#${item.href}`"
              class="relative hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md"
              :class="[
                `#${item.href}` === hash ? 'pl-8 text-blue-500 hover:text-blue-700' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <span
                v-if="`#${item.href}` === hash"
                class="absolute left-3 top-0 h-full flex items-center"
              >
                <span class="w-2 h-2 bg-blue-500 rounded-full" />
              </span>
              <span class="truncate">
                {{ item.text }}
              </span>
            </a>
          </template>
        </nav>
      </div>
    </div>

    <main class="flex-1 md:w-0">
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
import { defineComponent, computed, onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { markdownIt } from '/~/plugins/markdown'
import { kebab, transliterate } from '/~/helpers/text-transform'
import { reader } from '/~/helpers/reader'
import BaseLogo from '/~/components/base-logo.vue'

const content = ref<any>('')

export default defineComponent({
  name: 'HomeView',
  components: {
    BaseLogo
  },
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
    const route = useRoute()

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
            href: transliterate(kebab(m[2].toLowerCase())),
            text: m[2],
          }
        })
        .filter((v) => v.level === 2)
    })
    const hash = ref(route.hash)
    const navigation = ref<HTMLElement>(undefined)

    watch(() => route.hash, (value) => {
      hash.value = value
    })

    onMounted(async () => {
      const data = await fetch(`/articles/${props.id}.md`).then(response => response.blob())
      const reader = new FileReader()

      if (!hash.value) {
        hash.value = '#' + toc.value[0].href
      }

      reader.readAsText(data)

      reader.addEventListener('loadend', function(e){
        content.value = e.target.result
      })

      window.addEventListener('scroll', onScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
    })

    function onScroll() {
      const titles = document.body.querySelectorAll('h2[id]')
      let elHash = '#' + transliterate(titles[0].id)

      titles.forEach((title) => {
        const b = title.getBoundingClientRect()

        if (b.top <= 10) {
          elHash = '#' + transliterate(title.id)
        }
      })

      if (elHash != hash.value) {
        hash.value = elHash

        if (navigation.value) {
          const activeNav = navigation.value.querySelector(`[href="${elHash}"]`)

          navigation.value.scrollLeft = navigation.value.scrollLeft + activeNav.getBoundingClientRect().x - 20
        }
      }
    }

    return {
      md,
      toc,
      hash,
      navigation
    }
  }
})
</script>
