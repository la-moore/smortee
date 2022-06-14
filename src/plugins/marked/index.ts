import { Plugin } from 'vue'
import { marked, Renderer, Slugger } from 'marked'

function generateList(toc) {
  const slugger = new Slugger()

  const links = toc.map((link) => `<a href="#${slugger.slug(link.text)}">${link.text}</a>`)
    .map((link) => `<li>${link}</li>`)

  return `<ul>${links.join('')}</ul>`
}

const plugin: Plugin = function() {
  const renderer = new Renderer()

  renderer.heading = function(text, level, raw, slugger) {
    const id = slugger.slug(raw)

    return `<h${level} id="${id}">
			${text}
			<a class="heading-anchor" href="#${id}">
				<svg-icon icon="link" aria-hidden="true"></svg-icon>
				<span style="display: none">Section titled ${text}</span>
			</a>
		</h${level}>`
  }

  renderer.link = function(href, title, text) {
    let target = ''

    if(/(http(s?)):\/\//i.test(href)) {
      target = '_blank'
    }

    return `<a href="${href}" target="${target}">${text}</a>`
  }

  renderer.image = function(href, title, text) {
    return `<img src="${href}" alt="${text}" class="mx-auto max-w-full" />`
  }

  const descriptionList: marked.TokenizerExtension & marked.RendererExtension = {
    name: 'toc',
    level: 'block',
    start(src) { return src.match(/{{\s(\w+)\s}}/)?.index },
    tokenizer(src) {
      const rule = /^{{\s(\w+)\s}}/
      const match = rule.exec(src)

      this.lexer.tokens.map((token: any) => {
        if (token.type === 'toc') {
          token.tokens = this.lexer.tokens
            .filter((token: any) => token.type === 'heading')
            .filter((token: any) => token.depth > 1)
            .filter((token: any) => token.depth < 3)
        }

        return token
      })

      if (match) {
        const token = {
          type: 'toc',
          raw: match[0],
          text: match[0].trim(),
          tokens: this.lexer.tokens.filter((token) => token.type === 'heading')
        }

        this.lexer.inline(token.text, token.tokens)

        return token
      }
    },
    renderer(token) {
      return generateList(token.tokens.slice(0, -1))
    }
  }

  marked.use({
    renderer,
    extensions: [descriptionList]
  })
}

export default plugin
