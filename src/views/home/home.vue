<template>
  <div class="">
    <div class="flex items-center py-32">
      <div class="max-w-md w-full mx-auto py-12 px-6">
        <base-logo />
      </div>
    </div>

    <div class="max-w-7xl mx-auto pb-12 px-6">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template
          v-for="(course, idx) in courses"
          :key="idx"
        >
          <router-link
            class="block"
            :to="{ name: 'course', params: { id: course.id } }"
          >
            <div class="overflow-hidden border rounded-md bg-white h-full">
              <div class="px-6 py-4 space-y-3">
                <div class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {{ course.name }}
                </div>
                <p>
                  {{ course.description }}
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
import { defineComponent, ref } from 'vue'
import { useCourses } from '~/state/courses'
import BaseLogo from '~/components/base-logo.vue'

const courses = ref([])

export default defineComponent({
  name: 'HomeView',
  components: {
    BaseLogo
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchCourses } = useCourses()

    try {
      courses.value = await fetchCourses()
    } finally {
      next()
    }
  },
  setup() {
    return {
      courses
    }
  }
})
</script>
