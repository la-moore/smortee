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

    <div class="-mx-6 ring-1 ring-gray-300 md:mx-0 md:rounded-lg bg-white">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Название
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Статья
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Курс
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Ответы
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Пользователи
            </th>
            <th
              scope="col"
              class="relative py-3.5 pl-3 pr-4 sm:pr-6"
            />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, idx) in tasks"
            :key="idx"
          >
            <td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
              <div class="font-medium text-gray-900">
                {{ task.name }}
              </div>
              <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                <div v-if="task.article">
                  {{ task.article.course.name }}
                </div>
                <div v-if="task.article">
                  {{ task.article && task.article.name }}
                </div>
              </div>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              <router-link
                v-if="task.article"
                :to="{ name: 'admin-articles-edit', params: { id: task.article.id } }"
                class="text-blue-500"
              >
                {{ task.article.name }}
              </router-link>
              <span v-else>
                -
              </span>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              <router-link
                v-if="task.article && task.article.course"
                :to="{ name: 'admin-courses-edit', params: { id: task.article.course.id } }"
                class="text-blue-500"
              >
                {{ task.article.course.name }}
              </router-link>
              <span v-else>
                -
              </span>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ task.new_answers }}
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ task.users_count }}
            </td>
            <td class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">
              <router-link :to="{ name: 'admin-tasks-edit', params: { id: task.id } }">
                <button
                  type="button"
                  class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Посмотреть
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
