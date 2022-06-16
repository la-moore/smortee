export function camelize(str) {
  return str.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
}

export function pascalize(str) {
  const camel = camelize(str)

  return camel[0].toUpperCase() + camel.slice(1)
}

export function kebab(key) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()

  return result.split(/\s+/g).join('-').toLowerCase()
}

export function pluralize(count: number, noun: string, suffix = 's') {
  if (suffix === 'ies' && count !== 1) {
    noun = noun.substring(0, noun.length - 1)
  }

  return `${count} ${noun}${count !== 1 ? suffix : ''}`
}

export function transliterate(word){
  const a = { 'Ё':'YO','Й':'I','Ц':'TS','У':'U','К':'K','Е':'E','Н':'N','Г':'G','Ш':'SH','Щ':'SCH','З':'Z','Х':'H','Ъ':'\'','ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'\'','Ф':'F','Ы':'I','В':'V','А':'a','П':'P','Р':'R','О':'O','Л':'L','Д':'D','Ж':'ZH','Э':'E','ф':'f','ы':'i','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','Я':'Ya','Ч':'CH','С':'S','М':'M','И':'I','Т':'T','Ь':'\'','Б':'B','Ю':'YU','я':'ya','ч':'ch','с':'s','м':'m','и':'i','т':'t','ь':'\'','б':'b','ю':'yu' }

  return word.split('').map((char) => {
    return a[char] || char
  }).join('')
}
