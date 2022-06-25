<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Новая задача
        </h2>
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
          Статья
        </label>
        <div class="mt-1">
          <input
            id="article_id"
            v-model="fieldArticleId"
            type="number"
            name="article_id"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0"
          >
        </div>
      </div>

      <div class="sm:col-span-6">
        <div class="flex justify-between">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
          >
            Текст задачи
          </label>
          <div
            class="cursor-pointer"
            @click="preview = !preview"
          >
            <svg
              v-if="preview"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
        <div class="mt-1">
          <div
            v-if="preview"
            class="bg-white rounded-md border p-6"
          >
            <base-markdown
              class="max-w-4xl w-full mx-auto pb-12"
              :text="fieldText"
            />
          </div>

          <textarea
            v-else
            id="description"
            v-model="fieldText"
            name="description"
            rows="3"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>

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
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useTasks } from '~/state/tasks'
import router from '~/router'
import BaseMarkdown from '~/components/base-markdown.vue'
import BaseSpinner from '~/components/base-spinner.vue'

export default defineComponent({
  name: 'ProfileView',
  components: {
    BaseMarkdown,
    BaseSpinner
  },
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { createTask } = useTasks()
    const { handleSubmit, errors: formErrors, isSubmitting } = useForm()

    const preview = ref(false)

    const { value: fieldName } = useField('name')
    const { value: fieldText } = useField('text')
    const { value: fieldArticleId } = useField('article_id')

    if (props.articleId) {
      fieldArticleId.value = parseInt(props.articleId)
    }

    const onSubmit = handleSubmit(async (values) => {
      const task = await createTask(values)

      await router.push({ name: 'admin-tasks-edit', params: { id: task.id }})
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,
      preview,

      fieldName,
      fieldText,
      fieldArticleId
    }
  }
})
</script>
