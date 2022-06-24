<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Задачи
        </h2>
      </div>
      <div class="flex ml-4">
        <router-link :to="{ name: 'admin-tasks-create' }">
          <button
            type="button"
            class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Создать
          </button>
        </router-link>
      </div>
    </div>

    <ul class="mt-3 grid grid-cols-1 gap-3">
      <li
        v-for="(task, idx) in tasks"
        :key="idx"
      >
        <router-link
          :to="{ name: 'admin-tasks-edit', params: { id: task.id } }"
          class="col-span-1 flex shadow-sm rounded-md group border border-gray-200 bg-white"
        >
          <div class="flex-1 flex items-center justify-between truncate">
            <div class="flex-1 px-4 py-2 text-sm truncate">
              <p class="text-gray-900 font-medium group-hover:text-gray-600">
                {{ `${task.article.name} - ${task.name}` }}
              </p>
              <p class="text-gray-500">
                Ответов: {{ task.answers.length }}
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTasks } from '~/state/tasks'

const tasks = ref<any[]>([])

export default defineComponent({
  name: 'ProfileView',
  async beforeRouteEnter(to, from, next) {
    const { fetchTasks } = useTasks()

    try {
      tasks.value = await fetchTasks()
    } finally {
      next()
    }
  },
  setup() {
    return {
      tasks
    }
  }
})
</script>
