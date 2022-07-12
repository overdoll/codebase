import { FileMp4, FilePng } from '@//:assets/logos'

export const UPLOAD_ALLOWED_FILE_TYPES = ['image/png', 'video/mp4']
export const CLUB_ALLOWED_FILE_TYPES = ['image/png']

export const MAX_FILE_SIZE = 25000000

export const FILE_ICONS = {
  'image/png': FilePng,
  'video/mp4': FileMp4
}

export const TUS_OPTIONS = {
  endpoint: '/api/upload/',
  retryDelays: [0, 1000, 3000, 5000],
  chunkSize: 10485760
}
