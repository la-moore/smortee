import hljs from 'highlight.js'

function block(md) {
  md.renderer.rules.codeBlock = (tokens, idx, opt, env, self) => {
    const token = tokens[idx]
    const opts = {
      language: 'html'
    }

    return hljs.highlight(token.content, opts).value
  }
}

export default block
