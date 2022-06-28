<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Редактирование статьи
          </h2>
        </div>
        <div class="flex ml-4">
          <router-link :to="{ name: 'article', params: { id: article.id } }">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Посмотреть
            </button>
          </router-link>
        </div>
      </div>

      <form
        class="space-y-6 flex-1"
        @submit="onSubmit"
      >
        <div>
          <label
            for="link"
            class="block text-sm font-medium text-gray-700"
          >
            Название
          </label>
          <div class="mt-1">
            <input
              id="link"
              v-model="fieldName"
              type="text"
              name="link"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
          </div>
        </div>

        <div>
          <label
            for="article_id"
            class="block text-sm font-medium text-gray-700"
          >
            Курс
          </label>
          <div class="mt-1">
            <input
              id="article_id"
              v-model="fieldCourseId"
              type="number"
              name="article_id"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
            >
          </div>
        </div>

        <div>
          <label
            for="link"
            class="block text-sm font-medium text-gray-700"
          >
            Описание
          </label>
          <div class="mt-1">
            <textarea
              id="link"
              v-model="fieldDescription"
              type="text"
              name="link"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <markdown-editor
          v-model="fieldText"
          label="Текст статьи"
        />

        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 relative inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span
              v-if="isSubmitting"
              class="w-full h-full absolute top-0 left-0 flex items-center justify-center"
            >
              <base-spinner
                class="w-4 h-4"
              />
            </span>
            <span :class="{ 'opacity-0': isSubmitting }">
              Отправить
            </span>
          </button>
        </div>
      </form>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Задачи
          </h2>
        </div>
        <div class="flex ml-4">
          <router-link :to="{ name: 'admin-tasks-create', params: { articleId: article.id } }">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Добавить
            </button>
          </router-link>
        </div>
      </div>

      <dd
        v-if="tasks.length > 0"
        class="mt-1 text-sm text-gray-900"
      >
        <ul
          role="list"
          class="border border-gray-200 rounded-md divide-y divide-gray-200 bg-white"
        >
          <template
            v-for="(task, idx) in tasks"
            :key="idx"
          >
            <li class="pl-3 pr-4 py-3 text-sm">
              <div class="flex items-center justify-between">
                <div class="mx-4 flex-shrink-0 font-medium">
                  {{ task.id }}
                </div>
                <div class="w-0 flex-1 flex items-center">
                  <router-link
                    :to="{ name: 'admin-tasks-edit', params: { id: task.id } }"
                    class="ml-2 flex-1 w-0 truncate text-blue-500"
                  >
                    {{ task.name }}
                  </router-link>
                </div>
              </div>
              <div
                v-if="task.description"
                class="mt-3"
              >
                {{ task.description }}
              </div>
            </li>
          </template>
        </ul>
      </dd>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useArticles } from '~/state/articles'
import MarkdownEditor from './components/markdown-editor.vue'
import BaseSpinner from '~/components/base-spinner.vue'

const article = ref<any>(undefined)

export default defineComponent({
  name: 'ProfileView',
  components: {
    MarkdownEditor,
    BaseSpinner
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchArticle } = useArticles()

    try {
      article.value = await fetchArticle(`${to.params.id}`)
    } finally {
      next()
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { updateArticle, fetchArticleTasks } = useArticles()
    const { handleSubmit, errors: formErrors, isSubmitting } = useForm()

    const preview = ref(false)
    const tasks = ref([])

    const { value: fieldName } = useField('name')
    const { value: fieldText } = useField('text')
    const { value: fieldDescription } = useField('description')
    const { value: fieldCourseId } = useField('course_id')

    fieldName.value = article.value.name
    fieldText.value = article.value.text
    fieldDescription.value = article.value.description
    fieldCourseId.value = article.value.course?.id

    onMounted(async () => {
      tasks.value = await fetchArticleTasks(props.id)
    })

    const onSubmit = handleSubmit(async (values) => {
      article.value = await updateArticle(props.id, values)
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      article,
      tasks,
      preview,

      fieldName,
      fieldText,
      fieldDescription,
      fieldCourseId
    }
  }
})
</script>
