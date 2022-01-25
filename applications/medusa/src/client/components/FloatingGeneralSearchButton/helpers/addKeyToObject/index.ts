export const addKeyToObject = (value, object): any => {
  return { ...object, ...value }
}
