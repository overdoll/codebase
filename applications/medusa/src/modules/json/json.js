export default function SafeJSONParse(data, fallback = {}) {
  try {
    return JSON.parse(data);
  } catch (e) {
    
    return fallback;
  }
}
