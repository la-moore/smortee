<template>
  <form
    class="max-w-7xl mx-auto py-12 px-6 space-y-6"
    @submit="onSubmit"
  >
    <div class="flex sm:items-center justify-between flex-col sm:flex-row">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl truncate">
          Редактирование курса
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
        <router-link :to="{ name: 'course', params: { id: course.id } }">
          <button
            type="button"
            class="block items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Посмотреть
          </button>
        </router-link>
      </div>
    </div>

    <TabGroup
      :selected-index="selectedTab"
      @change="selectedTab = $event"
    >
      <Listbox
        v-model="selectedTab"
        class="md:hidden"
      >
        <div class="relative mt-1">
          <ListboxButton
            class="relative h-10 px-3 bg-white shadow-sm block w-full sm:text-sm border text-left border-gray-300 rounded-md"
          >
            <span class="block truncate">
              {{ tabs[selectedTab].title }}
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="(tab, idx) in tabs"
                v-slot="{ active, selected }"
                :key="idx"
                :value="idx"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                  >{{ tab.title }}</span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <div class="border-b border-gray-200 hidden md:block">
        <TabList class="-mb-px flex space-x-8">
          <Tab
            v-for="(tab, idx) in tabs"
            :key="idx"
            v-slot="{ selected }"
            as="template"
          >
            <button
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none"
              :class="[
                selected ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.title }}
            </button>
          </Tab>
        </TabList>
      </div>

      <TabPanels>
        <TabPanel>
          <div class="space-y-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >
                Название
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
          </div>
        </TabPanel>

        <TabPanel>
          <markdown-editor
            v-model="fieldText"
            label="Текст курса"
          />
        </TabPanel>

        <TabPanel>
          <div class="space-y-6">
            <div class="flex items-center justify-end">
              <div class="flex ml-4">
                <router-link :to="{ name: 'admin-articles-create', params: { courseId: course.id } }">
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
              v-if="articles.length > 0"
              class="mt-1 text-sm text-gray-900"
            >
              <ul
                role="list"
                class="border border-gray-200 rounded-md divide-y divide-gray-200 bg-white"
              >
                <template
                  v-for="(article, idx) in articles"
                  :key="idx"
                >
                  <li class="pl-3 pr-4 py-3 text-sm">
                    <div class="flex items-center justify-between">
                      <div class="mx-4 flex-shrink-0 font-medium">
                        {{ article.id }}
                      </div>
                      <div class="w-0 flex-1 flex items-center">
                        <router-link
                          :to="{ name: 'admin-articles-edit', params: { id: article.id } }"
                          class="ml-2 flex-1 w-0 truncate text-blue-500"
                        >
                          {{ article.name }}
                        </router-link>
                      </div>
                    </div>
                    <div
                      v-if="article.description"
                      class="mt-3"
                    >
                      {{ article.description }}
                    </div>
                  </li>
                </template>
              </ul>
            </dd>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import {
  TabGroup, TabList, Tab, TabPanels, TabPanel,
  Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption
} from '@headlessui/vue'
import { useField, useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useCourses } from '~/state/courses'
import MarkdownEditor from './components/markdown-editor.vue'
import BaseSpinner from '~/components/base-spinner.vue'
import router from '~/router'

const course = ref<any>(undefined)

export default defineComponent({
  name: 'ProfileView',
  components: {
    MarkdownEditor,
    BaseSpinner,
    TabGroup, TabList, Tab, TabPanels, TabPanel,
    Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption
  },
  async beforeRouteEnter(to, from, next) {
    const { fetchCourse } = useCourses()

    try {
      course.value = await fetchCourse(`${to.params.id}`)
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
    const { updateCourse, fetchCourseArticles } = useCourses()
    const { handleSubmit, errors: formErrors, isSubmitting } = useForm()

    const preview = ref(false)
    const articles = ref([])
    const tabs = ref([
      { title: 'Информация' },
      { title: 'Содержание' },
      { title: 'Статьи' },
    ])

    const selectedTab = computed({
      get() {
        const route = useRoute()
        const value = route.hash.replace(/#/, '')

        return value ? parseInt(value) : 0
      },
      set(v) {
        router.push({ hash: '#' + v })
      },
    })

    const { value: fieldName } = useField('name')
    const { value: fieldText } = useField('text')
    const { value: fieldDescription } = useField('description')

    fieldName.value = course.value.name
    fieldText.value = course.value.text
    fieldDescription.value = course.value.description

    onMounted(async () => {
      articles.value = await fetchCourseArticles(props.id)
    })

    const onSubmit = handleSubmit(async (values) => {
      course.value = await updateCourse(props.id, values)
    })

    return {
      onSubmit,
      formErrors,
      isSubmitting,

      tabs,
      selectedTab,
      course,
      articles,
      preview,

      fieldName,
      fieldText,
      fieldDescription
    }
  }
})
</script>
