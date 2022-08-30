import { FileJpeg, FileMp4, FilePng } from '@//:assets/logos'

export const UPLOAD_ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'video/mp4']
export const CLUB_ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg']

export const GENERIC_MAX_FILE_SIZE = 26214400

export const UPLOAD_MAX_FILE_SIZE = 1073741824

export const FILE_ICONS = {
  'image/png': FilePng,
  'image/jpeg': FileJpeg,
  'video/mp4': FileMp4
}

// TODO uppy doesn't expose the shouldTerminate variable to tus - custom plugin configuration is needed to pass in the parameter
export const TUS_OPTIONS = {
  endpoint: '/api/upload/',
  retryDelays: [0, 1000, 3000, 5000],
  chunkSize: 104857600,
  shouldTerminate: false
}
