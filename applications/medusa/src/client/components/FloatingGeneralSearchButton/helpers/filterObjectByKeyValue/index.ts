export const filterObjectByKeyValue = (key, value, object): any => {
  const keep = {}

  Object.keys(object).forEach((item) => {
    if (object[item][key] === value) {
      keep[item] = object[item]
    }
  })

  return keep
}
