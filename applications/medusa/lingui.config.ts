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
      path: 'src/client/domain/Root/__locale__/{locale}/index',
      include: ['src/modules/', 'src/client/components/', 'src/client/domain/Root/']
    },
    {
      path: 'src/client/domain/Join/__locale__/{locale}/index',
      include: ['src/client/domain/Join/']
    },
    {
      path: 'src/client/domain/CatchAll/__locale__/{locale}/index',
      include: ['src/client/domain/CatchAll/']
    },
    {
      path: 'src/client/domain/VerifyToken/__locale__/{locale}/index',
      include: ['src/client/domain/VerifyToken/']
    },
    {
      path: 'src/client/domain/ConfirmEmail/__locale__/{locale}/index',
      include: ['src/client/domain/ConfirmEmail/']
    },
    {
      path: 'src/client/domain/Settings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Settings.tsx']
    },
    {
      path: 'src/client/domain/Settings/Moderation/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Moderation']
    },
    {
      path: 'src/client/domain/Settings/Profile/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Profile']
    },
    {
      path: 'src/client/domain/Settings/Security/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Security']
    },
    {
      path: 'src/client/domain/Moderation/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/Moderation.tsx']
    },
    {
      path: 'src/client/domain/Moderation/History/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/History']
    },
    {
      path: 'src/client/domain/Moderation/Queue/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/Queue']
    },
    {
      path: 'src/client/domain/CreatePost/__locale__/{locale}/index',
      include: ['src/client/domain/CreatePost']
    },
    {
      path: 'src/client/domain/ViewPost/__locale__/{locale}/index',
      include: ['src/client/domain/ViewPost']
    },
    {
      path: 'src/client/domain/Manage/__locale__/{locale}/index',
      include: ['src/client/domain/Manage']
    },
    {
      path: 'src/client/domain/Manage/MyPosts/__locale__/{locale}/index',
      include: ['src/client/domain/Manage/MyPosts']
    },
    {
      path: 'src/client/domain/Manage/Clubs/__locale__/{locale}/index',
      include: ['src/client/domain/Manage/Clubs']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}
