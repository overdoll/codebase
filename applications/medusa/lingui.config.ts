export default {
  locales: [
    'en',
    'ru',
    'es',
    'fr',
    'it',
    'pt',
    'ko',
    'de',
    'ja',
    'zh',
    'cs'
  ],
  catalogs: [
    {
      path: 'src/client/domain/Manage/__locale__/{locale}/index',
      include: ['src/client/domain/Manage/']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}
