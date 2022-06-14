import { reactive, toRef } from 'vue'

const state = reactive({
  menu: [
    {
      label: 'HTML',
      route: { name: 'article', params: { id: 'introduction-to-front-end' }},
    },
    {
      label: 'CSS',
      route: { to: '/' },
    },
    {
      label: 'JavaScript',
      route: { to: '/' },
    },
    {
      label: 'Vue',
      route: { to: '/' },
    }
  ]
})

export function useMenu() {
  return {
    menu: toRef(state, 'menu')
  }
}
