export function getFormatCOP(value: number) {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumSignificantDigits: 5,
  })
}

// functions to validate objects
export function getSelectionClean(options: { [key: string]: boolean }) {
  return Object.keys(options)
    .filter((key) => key !== 'all')
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: options[key],
      }
    }, {})
}

export function isSomeSelected(options: { [key: string]: boolean }) {
  const selectionClean = getSelectionClean(options)
  return Object.values(selectionClean).some((option) => option)
}

export function isAllCheck(options: { [key: string]: boolean }) {
  const selectionClean = getSelectionClean(options)
  if (!Object.keys(selectionClean).length) {
    return false
  }
  return !Object.values(selectionClean).some((option) => !option)
}

export function getCountSelected(options: { [key: string]: boolean }) {
  return Object.values(options).filter(option => option).length
}
