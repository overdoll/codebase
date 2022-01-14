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
    }, {
      path: 'src/client/domain/Logout/__locale__/{locale}/index',
      include: ['src/client/domain/Logout/']
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
      path: 'src/client/domain/Home/__locale__/{locale}/index',
      include: ['src/client/domain/Home']
    },
    {
      path: 'src/client/domain/MyClubs/__locale__/{locale}/index',
      include: ['src/client/domain/MyClubs']
    },
    {
      path: 'src/client/domain/Profile/__locale__/{locale}/index',
      include: ['src/client/domain/Profile']
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
      path: 'src/client/domain/Settings/ConfirmEmail/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/ConfirmEmail']
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
      path: 'src/client/domain/Public/ViewClub/__locale__/{locale}/index',
      include: ['src/client/domain/Public/ViewClub']
    },
    {
      path: 'src/client/domain/Public/ViewPost/__locale__/{locale}/index',
      include: ['src/client/domain/Public/ViewPost']
    },
    {
      path: 'src/client/domain/ManageClub/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubHome/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubHome']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubMembers/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubMembers']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubPosts/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubPosts']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubSettings/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubSettings']
    },
    {
      path: 'src/client/domain/ManageClub/pages/CreateClub/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/CreateClub']
    },
    {
      path: 'src/client/domain/ManageClub/pages/CreatePost/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/CreatePost']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}
