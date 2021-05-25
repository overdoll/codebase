import Dexie from 'dexie'

const db = new Dexie('overdoll.uploads')

db.version(1).stores({
  thumbnails: 'id',
  urls: 'id',
  progress: 'id',
  characters: 'id',
  categories: 'id',
  artist: 'id',
  step: 'id',
  files: 'id'
})

export default db
