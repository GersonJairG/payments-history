export function getFormatCOP(value: number) {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumSignificantDigits: 5,
  })
}
