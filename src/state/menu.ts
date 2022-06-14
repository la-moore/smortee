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
      label: 'Tailwind',
      // route: { to: '/' },
    },
    {
      label: 'JavaScript',
      // route: { to: '/' },
    },
    {
      label: 'Vue',
      // route: { to: '/' },
    },
    {
      label: 'Git',
      // route: { to: '/' },
    }
  ]
})

export function useMenu() {
  return {
    menu: toRef(state, 'menu')
  }
}
