<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Профили
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
              Имя
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Почта
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Ссылка
            </th>
            <th
              scope="col"
              class="relative py-3.5 pl-3 pr-4 sm:pr-6"
            />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, idx) in users"
            :key="idx"
          >
            <td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
              <div class="font-medium text-gray-900">
                {{ user.name }}
              </div>
              <div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                <div>
                  {{ user.email }}
                </div>
                <div v-if="user.link">
                  {{ user.link }}
                </div>
              </div>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ user.email }}
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              <a
                v-if="user.link"
                :href="user.link"
                class="text-blue-500"
                target="_blank"
              >
                {{ user.link }}
              </a><span v-else>
                -
              </span>
            </td>
            <td class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">
              <router-link :to="{ name: 'admin-users-edit', params: { id: user.id } }">
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

const users = ref<any[]>([])

export default defineComponent({
  name: 'ProfileView',
  async beforeRouteEnter(to, from, next) {
    const { fetchUsers } = useUser()

    try {
      users.value = await fetchUsers()
    } finally {
      next()
    }
  },
  setup() {
    return {
      users
    }
  }
})
</script>
