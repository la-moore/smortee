// import image from 'markdown-it/lib/rules_inline/image'

const validAudioExtensions = ['aac', 'm4a', 'mp3', 'oga', 'ogg', 'wav']
const validVideoExtensions = ['mp4', 'm4v', 'ogv', 'webm', 'mpg', 'mpeg']

let messages = {
  en: {
    'html5 video not supported': 'Your browser does not support playing HTML5 video.',
    'html5 audio not supported': 'Your browser does not support playing HTML5 audio.',
    'html5 media fallback link': 'You can <a href="%s" download>download the file</a> instead.',
    'html5 media description': 'Here is a description of the content: %s'
  }
}

let translate = function(language, messageKey, messageParams?: any) {
  if (!messages[language] || !messages[language][messageKey])
    language = 'en'

  if (!messages[language])
    return ''

  let message = messages[language][messageKey] || ''

  if (messageParams)
    for (const param of messageParams)
      message = message.replace('%s', param)

  return message
}

function tokenizeImagesAndMedia(state, silent, md) {
  let attrs, code, label, pos, ref, res, title, tokens, start
  let href = ''

  const oldPos = state.pos
  const max = state.posMax

  // Exclamation mark followed by open square bracket - ![ - otherwise abort
  if (state.src.charCodeAt(state.pos) !== 0x21 ||
    state.src.charCodeAt(state.pos + 1) !== 0x5B)
    return false

  const labelStart = state.pos + 2
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false)

  // Parser failed to find ']', so it's not a valid link
  if (labelEnd < 0)
    return false

  pos = labelEnd + 1
  if (pos < max && state.src.charCodeAt(pos) === 0x28) { // Parenthesis: (
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos)
      if (!md.utils.isSpace(code) && code !== 0x0A) // LF \n
        break
    }
    if (pos >= max)
      return false

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax)
    if (res.ok) {
      href = state.md.normalizeLink(res.str)
      if (state.md.validateLink(href)) {
        pos = res.pos
      } else {
        href = ''
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos)
      if (!md.utils.isSpace(code) && code !== 0x0A)
        break
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax)
    if (pos < max && start !== pos && res.ok) {
      title = res.str
      pos = res.pos

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos)
        if (!md.utils.isSpace(code) && code !== 0x0A)
          break
      }
    } else {
      title = ''
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29) { // Parenthesis: )
      state.pos = oldPos
      return false
    }
    pos++
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined')
      return false

    if (pos < max && state.src.charCodeAt(pos) === 0x5B) { // Bracket: [
      start = pos + 1
      pos = state.md.helpers.parseLinkLabel(state, pos)
      if (pos >= 0) {
        label = state.src.slice(start, pos++)
      } else {
        pos = labelEnd + 1
      }
    } else {
      pos = labelEnd + 1
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label)
      label = state.src.slice(labelStart, labelEnd)

    ref = state.env.references[md.utils.normalizeReference(label)]
    if (!ref) {
      state.pos = oldPos
      return false
    }
    href = ref.href
    title = ref.title
  }

  state.pos = pos
  state.posMax = max

  if (silent)
    return true

  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  const content = state.src.slice(labelStart, labelEnd)

  state.md.inline.parse(
    content,
    state.md,
    state.env,
    tokens = []
  )

  const mediaType = guessMediaType(content, href)
  const tag = mediaType == 'image' ? 'img' : mediaType

  const token = state.push(mediaType, tag, 0)

  token.attrs = attrs = [
    ['src', href],
    ['class', 'mx-auto max-w-full'],
  ]
  if (mediaType == 'image')
    attrs.push(['alt', ''])
  token.children = tokens
  token.content = content

  if (title)
    attrs.push(['title', title])

  state.pos = pos
  state.posMax = max

  return true
}

function guessMediaType(title, url) {
  const extensionMatch = url.match(/\.([^/.]+)$/)

  if (title === 'iframe') {
    const extension = extensionMatch?.[1] || ''

    if (validAudioExtensions.indexOf(extension.toLowerCase()) != -1)
      return 'audio'
    else if (validVideoExtensions.indexOf(extension.toLowerCase()) != -1)
      return 'video'
    else if (title === 'iframe')
      return 'iframe'
  } else {
    if (extensionMatch === null)
      return 'image'
  }

  return 'image'
}

function renderMedia(tokens, idx, options, env, md) {
  const token = tokens[idx]
  const type = token.type

  if (type !== 'video' && type !== 'audio' && type !== 'iframe')
    return ''
  let attrs = options.html5Media[`${type}Attrs`].trim()

  if (attrs)
    attrs = ' ' + attrs

  // We'll always have a URL for non-image media: they are detected by URL
  const url = token.attrs[token.attrIndex('src')][1]

  // Title is set like this: ![descriptive text](video.mp4 "title")
  const title = token.attrIndex('title') != -1 ?
    ` title="${md.utils.escapeHtml(token.attrs[token.attrIndex('title')][1])}"` :
    ''

  const fallbackText =
    translate(env.language, `html5 ${type} not supported`) + '\n' +
    translate(env.language, 'html5 media fallback link', [url])

  const description = token.content ?
    '\n' + translate(env.language, 'html5 media description', [md.utils.escapeHtml(token.content)]) :
    ''

  return `<${type} src="${url}"${title}${attrs}>\n` +
    `${fallbackText}${description}\n` +
    `</${type}>`
}

function html5Media(md, options: any = {}) {
  if (options.messages)
    messages = options.messages

  if (options.translateFn)
    translate = options.translateFn

  const videoAttrs = options.videoAttrs !== undefined ?
    options.videoAttrs :
    'controls class="html5-video-player"'

  const audioAttrs = options.audioAttrs !== undefined ?
    options.audioAttrs :
    'controls class="html5-audio-player"'

  const iframeAttrs = options.iframeAttrs !== undefined ?
    options.iframeAttrs :
    'class="w-full h-full border rounded-xl" onload="this.style.height = this.contentWindow.document.body.scrollHeight+50+\'px\'"'

  md.inline.ruler.at('image', (tokens, silent) => tokenizeImagesAndMedia(tokens, silent, md))

  md.renderer.rules.video = md.renderer.rules.audio = md.renderer.rules.iframe = (tokens, idx, opt, env) => {
    opt.html5Media = {
      videoAttrs,
      audioAttrs,
      iframeAttrs
    }

    return renderMedia(tokens, idx, opt, env, md)
  }
}

export default html5Media
