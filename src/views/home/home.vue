<template>
  <main class="max-w-7xl mx-auto py-12 px-6">
    <div class="prose max-w-full">
      <h1>Введение в Frontend</h1>

      <ul>
        <template
          v-for="(item, idx) in menu"
          :key="idx"
        >
          <li v-if="item.route">
            <router-link :to="item.route">
              {{ item.label }}
            </router-link>
          </li>
          <li v-else>
            {{ item.label }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenu } from '/~/state/menu'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const { menu } = useMenu()

    return {
      menu
    }
  }
})
</script>
