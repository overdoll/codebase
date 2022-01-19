export default function getIdFromUppyUrl (url: string): string {
  return url.substring(url.lastIndexOf('/') + 1)
}
