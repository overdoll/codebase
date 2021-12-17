export default {
  locales: [
    'en-US',
    'ru'
  ],
  catalogs: [
    {
      path: 'src/client/domain/Manage/__locale__/{locale}/index',
      include: ['src/client/domain/Manage/']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en-US'
  }
}
