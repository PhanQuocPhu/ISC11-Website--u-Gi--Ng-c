const _ = require('lodash')

function calcArgs(args) {
  const bar     = (startIndex, args) => [startIndex, args]
  const hasArgs = typeof args !== 'undefined' && _.isObject(args)
  return (hasArgs) ? bar(1, args) : bar(0, {})
}

function concat() {
  const [startIndex, args] = calcArgs(arguments[0])

  let str = ''
  // The arguments pseudo-array allows access to all the parameters.
  for (let i = startIndex, n = arguments.length; i < n; ++i) {
    str += arguments[i]
  }

  return [args, str]
}

function stringifyArgs(args, defaultArgs = {}) {
  const withDefault = _.defaults(args, defaultArgs)
  let stringifiedArgs = ''
  _.forIn(withDefault, (value, key) => {
    if (value !== '') {
      stringifiedArgs += `${key}="${value}" `
    }
  })
  return stringifiedArgs
}

module.exports = {
  calcArgs,
  concat,
  stringifyArgs
}
