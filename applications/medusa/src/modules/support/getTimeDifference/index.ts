interface Props {
  date: Date
  type: 'minute' | 'hour' | 'day'
}

export default function getMinuteDifference ({
  date,
  type
}: Props): number {
  const dictionary = {
    minute: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24
  }

  const ms = 1000 * dictionary[type]
  const now = new Date()
  const later = new Date(date)

  const difference = Math.round((later.getTime() - now.getTime()) / ms)

  return difference < 0 ? 0 : difference
}
