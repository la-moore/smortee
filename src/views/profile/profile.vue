<template>
  <main class="max-w-7xl mx-auto py-12 px-6">
    <div>
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Задачи
      </h2>

      <ul class="mt-3 grid grid-cols-1 gap-5">
        <li
          v-for="(task, idx) in tasks"
          :key="idx"
        >
          <router-link
            :to="{ name: 'task', params: { id: task.id } }"
            class="col-span-1 flex shadow-sm rounded-md group"
          >
            <div
              class="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              :class="[
                task.complete ? 'bg-green-500' : 'bg-gray-500'
              ]"
            >
              <svg
                v-if="task.complete"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div class="flex-1 px-4 py-2 text-sm truncate">
                <p class="text-gray-900 font-medium group-hover:text-gray-600">
                  {{ `${task.article ? task.article.name + ' - ' : ''}${task.name}` }}
                </p>
                <p class="text-gray-500">
                  {{ task.complete ? 'Решена' : 'Не решена' }}
                </p>
              </div>
              <!--            <div class="flex-shrink-0 pr-2">-->
              <!--              <button-->
              <!--                type="button"-->
              <!--                class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"-->
              <!--              >-->
              <!--                <span class="sr-only">-->
              <!--                  Open options-->
              <!--                </span>-->
              <!--                &lt;!&ndash; Heroicon name: solid/dots-vertical &ndash;&gt;-->
              <!--                <svg-->
              <!--                  class="w-5 h-5"-->
              <!--                  xmlns="http://www.w3.org/2000/svg"-->
              <!--                  viewBox="0 0 20 20"-->
              <!--                  fill="currentColor"-->
              <!--                  aria-hidden="true"-->
              <!--                >-->
              <!--                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />-->
              <!--                </svg>-->
              <!--              </button>-->
              <!--            </div>-->
            </div>
          </router-link>
        </li>
      </ul>
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
