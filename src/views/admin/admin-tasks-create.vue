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

      <markdown-editor
        v-model="fieldText"
        label="Текст задачи"
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
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useTasks } from '~/state/tasks'
import router from '~/router'
import MarkdownEditor from './components/markdown-editor.vue'
import BaseSpinner from '~/components/base-spinner.vue'

export default defineComponent({
  name: 'ProfileView',
  components: {
    MarkdownEditor,
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

      await router.replace({ name: 'admin-tasks-edit', params: { id: task.id }})
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
