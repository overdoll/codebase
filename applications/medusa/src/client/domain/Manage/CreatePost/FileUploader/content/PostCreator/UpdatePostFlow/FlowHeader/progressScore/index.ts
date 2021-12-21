export default function progressScore (items: boolean[]): number {
  const calculated = items.map((item) => item ? 1 : 0)
  const reduced = calculated.reduce((a, b) => a + b, 0)
  return (reduced / items.length) * 100
}
