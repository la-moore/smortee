import { ObjectDirective, DirectiveBinding } from 'vue'

function validate(binding: DirectiveBinding) {
  if (typeof binding.value !== 'function') {
    console.warn('[v-autogrow] provided expression is not a function.')
    return false
  }

  return true
}

const index: ObjectDirective = {
  beforeMount(el: HTMLTextAreaElement) {
    el = el.tagName.toLowerCase() === 'textarea' ? el : el.querySelector('textarea')

    const observe = function(element, event, handler) {
      element.addEventListener(event, handler, false)
    }

    const resize = () => {
      const style = window?.getComputedStyle(el) || {}
      const ps = (property: string) => parseInt(style[property]) || 0
      const linesCount = (`${el.value}`.match(/\n/g) || []).length + 1
      const lineHeight = ps('lineHeight')
      const spaceY = ps('paddingTop') + ps('paddingBottom') + ps('borderTopWidth') + ps('borderBottomWidth')
      const rows = Math.max(el.rows, linesCount)

      el.style.height = (rows * lineHeight) + spaceY + 'px'
    }

    const delayedResize = () => {
      setTimeout(resize, 0)
    }

    const respondToVisibility = (element, callback) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) callback()
        })
      }, {
        root: document.documentElement
      })

      intersectionObserver.observe(element)
    }

    respondToVisibility(el, resize)

    observe(el, 'change', resize)
    observe(el, 'input', resize)
    observe(el, 'cut', delayedResize)
    observe(el, 'paste', delayedResize)
    observe(el, 'drop', delayedResize)

    resize()
  },
}

export default index
