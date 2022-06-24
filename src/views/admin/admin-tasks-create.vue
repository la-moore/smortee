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
            type="url"
            name="link"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://codepen.io/Moorlex/pen/KFehbRz"
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
        <label
          for="description"
          class="block text-sm font-medium text-gray-700"
        >
          Текст задачи
        </label>
        <div class="mt-1">
          <textarea
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
import { defineComponent } from 'vue'
import { useField, useForm } from 'vee-validate'

export default defineComponent({
  name: 'ProfileView',
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { handleSubmit, errors: formErrors, isSubmitting, resetForm } = useForm()

    const { value: fieldName } = useField('name')
    const { value: fieldText } = useField('text')
    const { value: fieldArticleId } = useField('article_id')

    if (props.articleId) {
      fieldArticleId.value = parseInt(props.articleId)
    }

    const onSubmit = handleSubmit(async (values) => {
      // const answer = await answerTask(props.id, values)

      resetForm()
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      fieldName,
      fieldText,
      fieldArticleId
    }
  }
})
</script>
