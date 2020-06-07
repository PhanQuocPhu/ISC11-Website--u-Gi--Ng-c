const {concat, stringifyArgs} = require('./util')

module.exports = {
  ul() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs         = stringifyArgs(args).trim()
    return `<ul ${strArgs}>${content}</ul>`
  },

  li() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs         = stringifyArgs(args).trim()
    return `<li ${strArgs}>${content}</li>`
  },

  body() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs         = stringifyArgs(args, {id : 'content'}).trim()
    return `<body ${strArgs}>${content}</body>`
  },

  head() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs         = stringifyArgs(args).trim()
    return `<head ${strArgs}>${content}</head>`
  },

  style() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args, {type : 'text/css'}).trim()

    return `<style ${strArgs}>${content}</style>`
  },

  html() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args).trim()
    return `<!DOCTYPE html><html ${strArgs}>${content}</html>`
  },

  script() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args, {type : 'text/javascript'}).trim()
    return `<script ${strArgs}>/*<!--*/${content}/*-->*/</script>`
  },

  img() {
    const [args, _content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args).trim()
    return `<img ${strArgs}/>`
  },

  div() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args).trim()
    return `<div ${strArgs}>${content}</div>`
  },

  span() {
    const [args, content] = concat.apply(this, arguments)
    const strArgs = stringifyArgs(args).trim()
    return `<span ${strArgs}>${content}</span>`
  },

  xid() {
    const [_args, content] = concat.apply(this, arguments)
    return content
  }
}
