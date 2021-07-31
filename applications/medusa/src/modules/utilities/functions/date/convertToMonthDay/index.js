/**
 * @flow
 */
export default function convertToMonthDay (date: string) {
  const current = new Date(date)
  const month = current.toLocaleDateString('default', { month: 'long' })
  const day = current.getDay()
  return `${month} ${day}`
}
