<template>
  <main class="max-w-7xl mx-auto py-12 px-6">
    <div>
      <ul
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <template
          v-for="(item, idx) in list"
          :key="idx"
        >
          <li class="col-span-1">
            <router-link
              :to="item.route"
              class="flex shadow-sm rounded-md"
            >
              <div
                class="flex-shrink-0 flex items-center justify-center w-16 h-12 text-white text-sm font-medium rounded-l-md"
                :class="[item.color]"
              >
                {{ item.count }}
              </div>

              <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <div class="text-gray-900 font-medium hover:text-gray-600">
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStats } from '~/state/stats'

const stats = ref<any>(undefined)

export default defineComponent({
  name: 'AdminView',
  async beforeRouteEnter(to, from, next) {
    const { fetchStats } = useStats()

    try {
      stats.value = await fetchStats()
    } finally {
      next()
    }
  },
  setup() {
    const list = computed(() => [
      {
        label: 'Курсы',
        color: 'bg-purple-600',
        route: { name: 'admin-courses' },
        count: stats.value?.courses
      },
      {
        label: 'Статьи',
        color: 'bg-yellow-500',
        route: { name: 'admin-articles' },
        count: stats.value?.articles
      },
      {
        label: 'Задачи',
        color: 'bg-green-500',
        route: { name: 'admin-tasks' },
        count: stats.value?.tasks
      },
      {
        label: 'Профили',
        color: 'bg-pink-600',
        route: { name: 'admin-users' },
        count: stats.value?.users
      }
    ])

    return {
      stats,
      list
    }
  }
})
</script>
