export const removeKeyFromObject = (key, object): any => {
  const {
    [key]: omit,
    ...rest
  } = object
  return rest
}
