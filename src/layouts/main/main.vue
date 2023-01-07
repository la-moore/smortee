<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="bg-white sticky top-0 border-b z-30">
      <div class="pt-safe pt-3" />
      <div class="h-16 flex items-center px-5">
        <div class="flex-1">
          <router-link to="/">
            <base-logo class="h-10" />
          </router-link>
        </div>

        <router-link
          v-if="user"
          :to="{ name: user.role === 'admin' ? 'admin' : 'profile' }"
          class="flex items-center"
        >
          <div class="text-right text-sm leading-4 hidden md:block">
            <p class="font-bold">
              {{ user.name }}
            </p>
            <p class="text-gray-500">
              {{ user.email }}
            </p>
          </div>
          <svg
            class="ml-2 w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <router-view />

    <div class="space-y-4 py-6 border-t">
      <div class="flex justify-center space-x-4">
        <a
          class="text-gray-500 font-medium"
          href="/"
        >
          Главная
        </a>
        <a
          class="text-gray-500 font-medium"
          href="/"
        >
          Профиль
        </a>
      </div>

      <div class="text-center text-gray-400">
        © 2023LaMoore. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import BaseLogo from '~/components/base-logo.vue'
import { useUser } from '~/state/user'

export default defineComponent({
  name: 'MainLayout',
  components: {
    BaseLogo
  },
  setup() {
    const { fetchMe } = useUser()
    const user = ref(undefined)

    onMounted(async () => {
      user.value = await fetchMe()
    })

    return {
      user
    }
  }
})
</script>
