import { Plugin } from 'vue'
import MarkdownIt from 'markdown-it'
import MarkdownToc from 'markdown-it-table-of-contents'
import MarkdownAttrs from 'markdown-it-attrs'
import MarkdownMeta from 'markdown-it-meta'
import MarkdownIframe from './markdown-it-iframe'
import MarkdownAnchor from './markdown-it-anchor'
import MarkdownMedia from './markdown-it-media'

export const markdownIt = new MarkdownIt({
  html: true
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
