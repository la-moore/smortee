<template>
  <main class="bg-white space-y-12">
    <div class="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col lg:flex-row">
      <div class="flex-1 shrink-0 lg:pr-6 mb-12 lg:mb-0">
        <nav class="space-y-1 flex flex-col lg:sticky lg:top-20 lg:w-64">
          <template
            v-for="(item, idx) in toc"
            :key="idx"
          >
            <a
              :href="`#${item.href}`"
              class="relative hover:bg-gray-50 flex px-3 py-2 text-sm font-medium rounded-md"
              :class="[
                item.level === 2 ? 'ml-4' : ''
              ]"
            >
              <span
                v-if="item.level === 2"
                class="w-1 h-1 bg-gray-700 rounded-full mr-2 shrink-0 mt-2"
              />
              {{ item.text }}
            </a>
          </template>
        </nav>
      </div>

      <base-markdown
        class="max-w-4xl w-full pb-12 py-20"
        :text="article"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { kebab, transliterate } from '~/helpers/text-transform'
import BaseMarkdown from '~/components/base-markdown.vue'

const article = ref<any>(undefined)

export default defineComponent({
  name: 'ArticleView',
  components: {
    BaseMarkdown
  },
  async beforeRouteEnter(to, from, next) {
    try {
      let response = await fetch('/answers.md')

      if (response.ok) {
        article.value = await response.text()
      }
    } finally {
      next()
    }
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup() {
    const toc = computed(() => {
      return article.value?.match(/^(#{1,6})\s.+$/gm)
        ?.map((v) => {
          const m = v.match(/^(#{1,6})\s(.+)$/m)

          return {
            raw: m[0],
            level: m[1].length,
            href: transliterate(kebab(m[2].toLowerCase())),
            text: m[2],
          }
        })
        ?.filter((v) => v.level <= 2)
    })
    const meta = ref(undefined)
    const navigation = ref<HTMLElement>(undefined)

    return {
      toc,
      meta,
      article,
      navigation
    }
  }
})
</script>
