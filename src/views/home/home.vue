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

      <br><br><br><br>
      <h1>Быстрые ссылки</h1>

      <ul>
        <li>
          <a
            href="https://codepen.io"
            target="_blank"
          >
            CodePen
          </a>
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/ru/docs/Learn"
            target="_blank"
          >
            Mozilla
          </a>
        </li>
        <li>
          <a
            href="http://htmlbook.ru"
            target="_blank"
          >
            HtmlBook
          </a>
        </li>
        <li>
          <a
            href="https://learn.javascript.ru"
            target="_blank"
          >
            JavaScript
          </a>
        </li>
        <li>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
          >
            TailwindCss
          </a>
        </li>
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
