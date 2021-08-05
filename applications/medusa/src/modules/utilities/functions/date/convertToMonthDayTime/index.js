/**
 * @flow
 */
export default function convertToMonthDayTime (date: string) {
  const current = new Date(date)
  const month = current.toLocaleDateString('default', { month: 'long' })
  const day = current.getDay()
  const time = current.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })

  return `${month} ${day}, ${time}`
}
