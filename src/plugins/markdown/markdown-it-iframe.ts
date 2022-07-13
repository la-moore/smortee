const template = (content) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <title>Document</title>
</head>
<body style="padding: 10px">
  ${content}
</body>
</html>
`

function block(md) {
  const defaultRenderer = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, opt, env, self) => {
    const token = tokens[idx]
    const content = template(token.content)
      .replace(/[\n\r]/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/"/g, '\'')

    if (token.info === 'iframe') {
      return `<iframe srcdoc="${content}" style="resize: horizontal;" class="w-full h-full border rounded-xl max-w-full" onload="this.style.height = this.contentWindow.document.body.scrollHeight+2+'px'"></iframe>`
    }

    return defaultRenderer(tokens, idx, opt, env, self)
  }
}

export default block
