interface JSON {
  [string: string]: any
}

export default function SafeJSONParse (data, fallback = {}): JSON {
  try {
    return JSON.parse(data)
  } catch (e) {
    return fallback
  }
}
