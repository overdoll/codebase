export default (!!(
  typeof window !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  window.document &&
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  window.document.createElement
))
