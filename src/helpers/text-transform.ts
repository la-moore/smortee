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
