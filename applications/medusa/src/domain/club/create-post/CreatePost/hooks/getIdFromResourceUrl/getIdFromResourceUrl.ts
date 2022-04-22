export default function getIdFromResourceUrl (url: string): string {
  const partialId = url.slice(29)

  return partialId.replace(/\.[^/.]+$/, '')
}
