function block(md, name, opts) {
  const defaultRenderer = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, opt, env, self) => {
    const token = tokens[idx]
    const content = token.content.replace(/[\n\r]/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/"/g, '\'')

    if (token.info === 'iframe')
      return `<iframe srcdoc="${content}" style="resize: horizontal;" class="w-full h-full border rounded-xl" onload="this.style.height = this.contentWindow.document.body.scrollHeight+50+'px'"></iframe>`

    return defaultRenderer(tokens, idx, opt, env, self)
  }
}

export default block
