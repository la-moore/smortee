<template>
  <form
    class="max-w-7xl mx-auto py-12 px-6 space-y-12"
    @submit="onSubmit"
  >
    <div class="flex sm:items-center justify-between flex-col sm:flex-row">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl truncate">
          Редактирование ответа
        </h2>
      </div>
      <div class="flex mt-3 sm:mt-0 sm:ml-4 space-x-3">
        <button
          type="submit"
          class="relative w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            Сохранить
          </span>
        </button>
      </div>
    </div>

    <div class="space-y-6">
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          Пользователь
        </label>
        <div class="mt-1">
          <input
            id="name"
            :value="answer.user.name"
            type="url"
            name="link"
            readonly
            class="pointer-events-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 block w-full sm:text-sm border-gray-300 rounded-md"
          >
        </div>
      </div>

      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          Ссылка
        </label>
        <div class="mt-1">
          <input
            id="name"
            v-model="fieldLink"
            type="url"
            name="link"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          >
        </div>
      </div>

      <div>
        <label
          for="link"
          class="block text-sm font-medium text-gray-700"
        >
          Комментарий
        </label>
        <div class="mt-1">
          <textarea
            id="link"
            v-model="fieldText"
            name="text"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label
          for="points"
          class="block text-sm font-medium text-gray-700"
        >
          Оценка
        </label>
        <div class="mt-1">
          <input
            id="points"
            v-model="fieldPoints"
            type="number"
            name="points"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0"
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useTasks } from '~/state/tasks'
import BaseSpinner from '~/components/base-spinner.vue'

const answer = ref<any>(undefined)

export default defineComponent({
  name: 'ProfileView',
  components: {
    BaseSpinner
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchTaskAnswer } = useTasks()

    try {
      answer.value = await fetchTaskAnswer(to.params.taskId, to.params.id)
    } finally {
      next()
    }
  },
  props: {
    taskId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { updateTaskAnswer } = useTasks()
    const { handleSubmit, errors: formErrors, isSubmitting } = useForm()

    const preview = ref(false)
    const users = ref([])

    const { value: fieldLink } = useField('link')
    const { value: fieldText } = useField('text')
    const { value: fieldPoints } = useField('points')

    fieldLink.value = answer.value.link
    fieldText.value = answer.value.text
    fieldPoints.value = answer.value.points

    const onSubmit = handleSubmit(async (values) => {
      answer.value = await updateTaskAnswer(props.taskId, props.id, values)
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      users,
      answer,
      preview,

      fieldLink,
      fieldText,
      fieldPoints
    }
  }
})
</script>
