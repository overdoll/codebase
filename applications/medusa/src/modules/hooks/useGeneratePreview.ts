import { useMemo } from 'react'

const svg = (w: string, h: string, previewHex: string): string => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <rect width="${w}" height="${h}" fill="${previewHex}"/>
</svg>`

const toBase64 = (str: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function useGeneratePreview (preview: string | undefined): string | null {
  return useMemo(() => {
    if (preview == null || preview === '') {
      return null
    }

    return `data:image/svg+xml;base64,${toBase64(svg('100', '100', preview))}`
  }, [])
}
