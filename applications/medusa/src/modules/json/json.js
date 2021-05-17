export default function SafeJSONParse(data, fallback = {}) {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return fallback;
  }
}
