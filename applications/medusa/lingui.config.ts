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
      path: 'src/client/domain/Settings/Profile/RootEmails/ConfirmEmail/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Profile/RootEmails/ConfirmEmail']
    },
    {
      path: 'src/client/domain/Settings/Preferences/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Preferences']
    },
    {
      path: 'src/client/domain/Settings/Billing/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing']
    },
    {
      path: 'src/client/domain/Settings/Billing/RootSubscriptionSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootSubscriptionSettings']
    },
    {
      path: 'src/client/domain/Settings/Billing/RootPaymentMethodSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootPaymentMethodSettings']
    },
    {
      path: 'src/client/domain/Moderation/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/Moderation']
    },
    {
      path: 'src/client/domain/Moderation/pages/History/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/pages/History']
    },
    {
      path: 'src/client/domain/Moderation/pages/Queue/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/pages/Queue']
    },
    {
      path: 'src/client/domain/Moderation/pages/Reports/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/pages/Reports']
    },
    {
      path: 'src/client/domain/Moderation/pages/ModerationPost/__locale__/{locale}/index',
      include: ['src/client/domain/Moderation/pages/ModerationPost']
    },
    {
      path: 'src/client/domain/PublicPost/__locale__/{locale}/index',
      include: ['src/client/domain/PublicPost']
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
      path: 'src/client/domain/ClubPublicPage/__locale__/{locale}/index',
      include: ['src/client/domain/ClubPublicPage']
    },
    {
      path: 'src/client/domain/ClubPublicPage/ClubPublicPage/pages/ClubPublicPosts/__locale__/{locale}/index',
      include: ['src/client/domain/ClubPublicPage/ClubPublicPage/pages/ClubPublicPosts']
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
    },
    {
      path: 'src/client/domain/Search/__locale__/{locale}/index',
      include: ['src/client/domain/Search']
    },
    {
      path: 'src/client/domain/Help/__locale__/{locale}/index',
      include: ['src/client/domain/Help']
    },
    {
      path: 'src/client/domain/Admin/__locale__/{locale}/index',
      include: ['src/client/domain/Admin']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminAudience/AdminCreateAudience/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminAudience/AdminCreateAudience']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminAudience/AdminSearchAudiences/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminAudience/AdminSearchAudiences']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminAudience/AdminViewAudience/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminAudience/AdminViewAudience']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCharacter/AdminCreateCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCharacter/AdminCreateCharacter']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCharacter/AdminSearchCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCharacter/AdminSearchCharacter']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCharacter/AdminViewCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCharacter/AdminViewCharacter']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCategory/AdminCreateCategory/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCategory/AdminCreateCategory']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCategory/AdminSearchCategories/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCategory/AdminSearchCategories']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminCategory/AdminViewCategory/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminCategory/AdminViewCategory']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminRules/AdminSearchRules/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminRules/AdminSearchRules']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminRules/AdminCreateRule/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminRules/AdminCreateRule']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminRules/AdminViewRule/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminRules/AdminViewRule']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminSeries/AdminCreateSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminSeries/AdminCreateSeries']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminSeries/AdminSearchSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminSeries/AdminSearchSeries']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminSeries/AdminViewSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminSeries/AdminViewSeries']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminAccount/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminAccount']
    },
    {
      path: 'src/client/domain/Admin/pages/AdminClub/__locale__/{locale}/index',
      include: ['src/client/domain/Admin/pages/AdminClub']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}
