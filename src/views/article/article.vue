<template>
  <div class="min-h-screen md:flex">
    <div class="flex-shrink-0 md:w-64 md:h-screen md:border-r bg-gray-100 sticky top-0">
      <div class="pb-4">
        <div class="h-14 flex items-center px-5">
          <base-logo class="h-10" />
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

    <main class="flex-1 md:w-0 space-y-12">
      <div class="max-w-7xl mx-auto py-12 px-6">
        <div class="prose max-w-5xl mx-auto w-full mb-12">
          <h1>{{ article.name }}</h1>
        </div>

        <div
          class="prose max-w-5xl mx-auto w-full"
          v-html="md"
        />
      </div>

      <div
        v-if="article.tasks?.length"
        class="bg-gray-50 py-12"
      >
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-20">
            Практика
          </h2>

          <div class="grid lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            <template
              v-for="(task, idx) in article.tasks"
              :key="idx"
            >
              <router-link
                class="block"
                :to="{ name: 'task', params: { id: task.id } }"
              >
                <div class="overflow-hidden border rounded-md bg-white h-full">
                  <div class="px-6 py-4 space-y-3">
                    <div class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      {{ task.name }}
                    </div>
                    <p v-if="task.description">
                      {{ task.description }}
                    </p>
                  </div>
                </div>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { markdownIt } from '/~/plugins/markdown'
import { kebab, transliterate } from '/~/helpers/text-transform'
import { useArticles } from '/~/state/articles'
import BaseLogo from '/~/components/base-logo.vue'

const article = ref<any>(undefined)

export default defineComponent({
  name: 'ArticleView',
  components: {
    BaseLogo
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchArticle } = useArticles()

    article.value = await fetchArticle(`${to.params.id}`)

    next()
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup() {
    const route = useRoute()

    const md = computed(() => {
      return markdownIt.render(article.value?.text)
    })
    const toc = computed(() => {
      return article.value?.text.match(/^(#{1,6})\s.+$/gm)
        ?.map((v) => {
          const m = v.match(/^(#{1,6})\s(.+)$/m)

          return {
            raw: m[0],
            level: m[1].length,
            href: transliterate(kebab(m[2].toLowerCase())),
            text: m[2],
          }
        })
        ?.filter((v) => v.level === 2)
    })
    const meta = ref(undefined)
    const hash = ref(route.hash)
    const navigation = ref<HTMLElement>(undefined)

    watch(() => route.hash, (value) => {
      hash.value = value
    })

    onMounted(async () => {
      window.addEventListener('scroll', onScroll)

      meta.value = markdownIt.meta
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
      meta,
      article,
      navigation
    }
  }
})
</script>
