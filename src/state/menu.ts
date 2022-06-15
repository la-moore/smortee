import { reactive, toRef } from 'vue'

const state = reactive({
  menu: [
    {
      label: 'HTML',
      route: { name: 'article', params: { id: 'html' }},
    },
    {
      label: 'CSS',
      route: { name: 'article', params: { id: 'css' }},
    },
    {
      label: 'Дизайн',
      route: { name: 'article', params: { id: 'design' }},
    },
    {
      label: 'Библиотеки',
      route: { name: 'article', params: { id: 'libs' }},
    },
    {
      label: 'JavaScript',
      route: { name: 'article', params: { id: 'javascript' }},
    },
    {
      label: 'Vue',
      // route: { name: 'article', params: { id: 'design' }},
    },
    {
      label: 'Git',
      // route: { name: 'article', params: { id: 'design' }},
    }
  ]
})

export function useMenu() {
  return {
    menu: toRef(state, 'menu')
  }
}
