export default function getBasePath (path: string): string {
  return `/${path.split('/')[1]}`
}
