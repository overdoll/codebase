export default function formatSecondsIntoMinutes (seconds: number): string {
  const minutesSubstring = [14, 5]

  const secondsSubstring = [15, 4]

  if (seconds >= 60) {
    return new Date(seconds * 1000).toISOString().substr(minutesSubstring[0], minutesSubstring[1])
  }

  return new Date(seconds * 1000).toISOString().substr(secondsSubstring[0], secondsSubstring[1])
}
