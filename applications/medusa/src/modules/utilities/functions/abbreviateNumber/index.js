/**
 * @flow
 */

export default function abbreviateNumber (value: number, numberLength = 3) {
  let newValue = value
  let suffixNum = 0
  const suffixes = ['', 'K', 'M', 'B', 'T']

  while (newValue >= 1000) {
    newValue /= 1000
    suffixNum++
  }

  return newValue.toPrecision(numberLength) + suffixes[suffixNum]
}
