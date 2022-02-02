export default function removeKeyFromObject (key, object): any {
  const {
    [key]: omit,
    ...rest
  } = object
  return rest
}
