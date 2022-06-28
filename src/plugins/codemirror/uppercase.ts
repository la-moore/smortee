import { EditorSelection } from '@codemirror/state'

function isUpperCase(str) {
  return str === str.toUpperCase()
}

function uppercaseRange(range, state) {
  const text = state.sliceDoc(range.from, range.to)
  const newText = isUpperCase(text) ? text.toLowerCase() : text.toUpperCase()

  const change = {
    from: range.from,
    to: range.to,
    insert: newText
  }

  return {
    changes: change,
    range,
  }
}

export function uppercase(view) {
  const transaction = view.state.changeByRange((range) =>
    uppercaseRange(range, view.state),
  )

  view.dispatch(transaction)

  return true
}

export default {
  key: 'Ctrl-Shift-u',
  run: uppercase,
}
