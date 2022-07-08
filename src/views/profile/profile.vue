<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Задачи
        </h2>
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
              Оценка
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
              <div class="font-medium text-gray-900 flex items-center space-x-2 truncate">
                <template v-if="task.best_answer">
                  <svg
                    v-if="task.best_answer === 5"
                    class="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-6 h-6"
                    :class="[
                      task.best_answer < 3 ? 'text-red-500' :
                      task.best_answer < 5 ? 'text-orange-500' : ''
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                <svg
                  v-else
                  class="w-6 h-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span>{{ task.name }}</span>
              </div>
              <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                <div>
                  Оценка: {{ task.best_answer || '-' }}
                </div>
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
                :to="{ name: 'article', params: { id: task.article.id } }"
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
                :to="{ name: 'course', params: { id: task.article.course.id } }"
                class="text-blue-500"
              >
                {{ task.article.course.name }}
              </router-link>
              <span v-else>
                -
              </span>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ task.answers_count }}
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ task.best_answer || '-' }}
            </td>
            <td class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">
              <router-link :to="{ name: 'task', params: { id: task.id } }">
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
import { useUser } from '~/state/user'
import { useTasks } from '~/state/tasks'

const profile = ref<any>(undefined)
const tasks = ref<any[]>([])

export default defineComponent({
  name: 'ProfileView',
  async beforeRouteEnter(to, from, next) {
    const { fetchMe } = useUser()
    const { fetchTasks } = useTasks()

    try {
      profile.value = await fetchMe()
      tasks.value = await fetchTasks()
    } finally {
      next()
    }
  },
  setup() {
    return {
      profile,
      tasks
    }
  }
})
</script>
