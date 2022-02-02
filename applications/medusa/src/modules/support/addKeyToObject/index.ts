export default function addKeyToObject (value, object): any {
  return { ...object, ...value }
}
