import { Plugin } from 'vue'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import MarkdownIt from 'markdown-it'
import MarkdownToc from 'markdown-it-table-of-contents'
import MarkdownAttrs from 'markdown-it-attrs'
import MarkdownMeta from 'markdown-it-meta'
import MarkdownIframe from './markdown-it-iframe'
import MarkdownAnchor from './markdown-it-anchor'
import MarkdownMedia from './markdown-it-media'

hljs.registerLanguage('javascript', javascript)

export const markdownIt = new MarkdownIt({
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value
    }

    return ''
  }
})

const plugin: Plugin = function() {
  markdownIt.use(MarkdownAttrs)
  markdownIt.use(MarkdownAnchor)
  markdownIt.use(MarkdownMedia)
  markdownIt.use(MarkdownMeta)
  markdownIt.use(MarkdownIframe)
  markdownIt.use(MarkdownToc, {
    includeLevel: [2]
  })
}

export default plugin
