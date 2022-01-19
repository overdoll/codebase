export default function abbreviateNumber (value: number, decimalSize = 3): string {
  let newValue = value
  let suffixNum = 0
  const suffixes = ['', 'k', 'm', 'b', 't']

  const factor = 1000

  while (newValue >= factor) {
    newValue /= factor
    suffixNum++
  }

  return `${newValue.toPrecision(decimalSize).replace(/\.0+$/, '')}${suffixes[suffixNum]}`
}
