<template>
  <div
    v-if="course"
    class="bg-gray-50 min-h-screen"
  >
    <div class="h-14 flex items-center px-5 bg-white">
      <base-logo class="h-10" />
    </div>

    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div class="max-w-xl">
          <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {{ course.name }}
          </h2>
          <p class="mt-5 text-xl text-gray-500">
            {{ course.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-12 px-6">
      <div class="grid lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <template
          v-for="(article, idx) in course.articles"
          :key="idx"
        >
          <router-link
            class="block"
            :to="{ name: 'article', params: { id: article.id } }"
          >
            <div class="overflow-hidden border rounded-md bg-white h-full">
              <div class="px-6 py-4 space-y-3">
                <div class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {{ article.name }}
                </div>
                <p v-if="article.description">
                  {{ article.description }}
                </p>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useCourses } from '/~/state/courses'
import BaseLogo from '/~/components/base-logo.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    BaseLogo
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const { fetchCourse } = useCourses()
    const course = ref(undefined)

    onMounted(async () => {
      course.value = await fetchCourse(props.id)
    })

    return {
      course
    }
  }
})
</script>
