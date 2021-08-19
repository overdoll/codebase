export default function getBasePath (path) {
  return `/${path.split('/')[1]}`
}
