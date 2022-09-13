import { FileJpeg, FileMp4, FilePng, FileWebm } from '@//:assets/logos'

export const UPLOAD_ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'video/mp4', 'video/webm']
export const CLUB_ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg']

export const GENERIC_MAX_FILE_SIZE = 26214400

export const UPLOAD_MAX_FILE_SIZE = 1073741824

export const FILE_ICONS = {
  'image/png': FilePng,
  'image/jpeg': FileJpeg,
  'video/mp4': FileMp4,
  'video/webm': FileWebm
}

export const TUS_OPTIONS = {
  endpoint: '/api/upload/',
  retryDelays: [0, 1000, 3000, 5000, 10000],
  chunkSize: 1048576,
  shouldTerminate: false
}
