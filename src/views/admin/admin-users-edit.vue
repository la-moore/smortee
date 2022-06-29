<template>
  <main class="max-w-7xl mx-auto py-12 px-6 space-y-12">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Редактирование профиля
          </h2>
        </div>
      </div>

      <form
        class="space-y-6 flex-1"
        @submit="onSubmit"
      >
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700"
          >
            Имя
          </label>
          <div class="mt-1">
            <input
              id="name"
              v-model="fieldName"
              type="text"
              name="name"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >
            Почта
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="fieldEmail"
              type="email"
              name="email"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
          </div>
        </div>

        <div>
          <label
            for="link"
            class="block text-sm font-medium text-gray-700"
          >
            Ссылка
          </label>
          <div class="mt-1">
            <input
              id="link"
              v-model="fieldLink"
              type="url"
              name="link"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
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
              Сохранить
            </span>
          </button>
        </div>
      </form>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Ответы
          </h2>
        </div>
      </div>

      <dd
        v-if="answers.length > 0"
        class="mt-1 text-sm text-gray-900"
      >
        <ul
          role="list"
          class="border border-gray-200 rounded-md divide-y divide-gray-200 bg-white"
        >
          <template
            v-for="(answer, idx) in answers"
            :key="idx"
          >
            <li class="pl-3 pr-4 py-3 text-sm">
              <div class="flex items-center justify-between">
                <div class="w-0 flex-1 flex items-center">
                  <svg
                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <a
                    :href="answer.description"
                    target="_blank"
                    class="ml-2 flex-1 w-0 truncate text-blue-500"
                  >
                    {{ answer.description }}
                  </a>
                </div>
              </div>
              <div
                v-if="answer.text"
                class="mt-3"
              >
                {{ answer.text }}
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
import { useUser } from '~/state/user'

const user = ref<any>(undefined)

export default defineComponent({
  name: 'ProfileView',
  async beforeRouteEnter(to, from, next) {
    const { fetchUser } = useUser()

    try {
      user.value = await fetchUser(`${to.params.id}`)
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
    const { updateUser, fetchUserAnswers } = useUser()
    const { handleSubmit, errors: formErrors, isSubmitting } = useForm()

    const answers = ref([])

    const { value: fieldName } = useField('name')
    const { value: fieldLink } = useField('link')
    const { value: fieldEmail } = useField('email')

    fieldName.value = user.value.name
    fieldEmail.value = user.value.email
    fieldLink.value = user.value.link

    onMounted(async () => {
      answers.value = await fetchUserAnswers(props.id)
    })

    const onSubmit = handleSubmit(async (values) => {
      user.value = await updateUser(props.id, values)
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      user,
      answers,

      fieldName,
      fieldLink,
      fieldEmail,
    }
  }
})
</script>
