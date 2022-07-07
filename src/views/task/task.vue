<template>
  <main class="">
    <div class="bg-white border-b">
      <div class="max-w-7xl flex flex-col mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {{ task.name }}
          </h2>
          <p
            v-if="task.article"
            class="mt-5 text-xl text-gray-500"
          >
            <span>Тема: </span>
            <router-link
              :to="{ name: 'article', params: { id: task.article.id } }"
              class="text-blue-600"
            >
              {{ task.article.name }}
            </router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-6">
        <base-markdown
          class="max-w-4xl w-full mx-auto pb-12"
          :text="task.text"
        />
      </div>
    </div>

    <div class="py-12">
      <div class="max-w-7xl mx-auto px-6 space-y-12">
        <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Ответ
        </h2>

        <div class="flex flex-col space-y-6 md:space-y-0 md:space-x-6 md:flex-row">
          <form
            class="space-y-6 flex-1"
            @submit="onSubmit"
          >
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
                  v-model="fieldDescription"
                  type="url"
                  name="link"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://codepen.io/Moorlex/pen/KFehbRz"
                >
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Описание
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
              <p class="mt-2 text-sm text-gray-500">
                Это поле не обязательно, но вы можете рассказать что-нибудь или задать вопрос.
              </p>
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
          <div class="flex-1">
            <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Ваши ответы
            </h2>

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
                          :href="answer.link"
                          target="_blank"
                          class="ml-2 flex-1 w-0 truncate text-blue-500"
                        >
                          {{ answer.link }}
                        </a>
                      </div>
                      <div class="ml-4 flex-shrink-0 font-medium">
                        {{ answer.points }}
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
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTasks } from '~/state/tasks'
import { useUser } from '~/state/user'
import { useField, useForm } from 'vee-validate'
import BaseMarkdown from '~/components/base-markdown.vue'
import BaseSpinner from '~/components/base-spinner.vue'

const task = ref<any>(undefined)
const profile = ref<any>(undefined)
const answers = ref<any[]>([])

export default defineComponent({
  name: 'TaskView',
  components: {
    BaseMarkdown,
    BaseSpinner
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchTask, fetchTaskAnswers } = useTasks()
    const { fetchMe } = useUser()

    try {
      task.value = await fetchTask(`${to.params.id}`)
      answers.value = await fetchTaskAnswers(`${to.params.id}`)
      profile.value = await fetchMe()
    } finally {
      next()
    }
  },
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const { answerTask } = useTasks()
    const { handleSubmit, errors: formErrors, isSubmitting, resetForm } = useForm()

    const { value: fieldDescription } = useField('description')
    const { value: fieldText } = useField('text')
    const { value: fieldArticleId } = useField('article_id')

    const onSubmit = handleSubmit(async (values) => {
      const answer = await answerTask(props.id, values)

      resetForm()
      task.value.answers.push(answer)
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      task,
      profile,
      answers,

      fieldDescription,
      fieldText,
      fieldArticleId
    }
  }
})
</script>
