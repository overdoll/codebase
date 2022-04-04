export default {
  locales: [
    'en'
    // 'ru',
    // 'es',
    // 'fr',
    // 'it',
    // 'pt',
    // 'ko',
    // 'de',
    // 'ja',
    // 'zh',
    // 'cs'
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
      path: 'src/client/domain/Settings/Profile/RootEmails/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Profile/RootEmails']
    },
    {
      path: 'src/client/domain/Settings/Profile/RootUsername/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Profile/RootUsername']
    },
    {
      path: 'src/client/domain/ConfirmEmail/__locale__/{locale}/index',
      include: ['src/client/domain/ConfirmEmail']
    },
    {
      path: 'src/client/domain/Settings/Security/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Security']
    },
    {
      path: 'src/client/domain/Settings/Security/RootSessionsSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Security/RootSessionsSettings']
    },
    {
      path: 'src/client/domain/Settings/Security/RootMultiFactorTotpSetup/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Security/RootMultiFactorTotpSetup']
    },
    {
      path: 'src/client/domain/Settings/Security/RootRecoveryCodesSetup/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Security/RootRecoveryCodesSetup']
    },
    {
      path: 'src/client/domain/Settings/Preferences/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Preferences']
    },
    {
      path: 'src/client/domain/Settings/Preferences/RootCurationProfileSetup/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Preferences/RootCurationProfileSetup']
    },
    {
      path: 'src/client/domain/Settings/Billing/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing']
    },
    {
      path: 'src/client/domain/Settings/Billing/pages/RootSubscriptionsSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootSubscriptionsSettings']
    },
    {
      path: 'src/client/domain/Settings/Billing/pages/RootSavedPaymentMethodsSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootSavedPaymentMethodsSettings']
    },
    {
      path: 'src/client/domain/Settings/Billing/pages/RootAccountClubSupporterSubscriptionSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootAccountClubSupporterSubscriptionSettings']
    },
    {
      path: 'src/client/domain/Settings/Billing/pages/RootTransactionsSettings/__locale__/{locale}/index',
      include: ['src/client/domain/Settings/Billing/RootTransactionsSettings']
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
      path: 'src/client/domain/ClubPublicPosts/__locale__/{locale}/index',
      include: ['src/client/domain/ClubPublicPosts']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubSettings/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubSettings']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubSettings/RootChangeClubName/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubSettings/RootChangeClubName']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubSettings/RootChangeClubThumbnail/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubSettings/RootChangeClubThumbnail']
    },
    {
      path: 'src/client/domain/ManageClub/pages/ClubSettings/RootClubAliases/__locale__/{locale}/index',
      include: ['src/client/domain/ManageClub/pages/ClubSettings/RootClubAliases']
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
      path: 'src/client/domain/Staff/__locale__/{locale}/index',
      include: ['src/client/domain/Staff']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAudience/StaffCreateAudience/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAudience/StaffCreateAudience']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAudience/StaffSearchAudiences/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAudience/StaffSearchAudiences']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAudience/StaffViewAudience/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAudience/StaffViewAudience']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCharacter/StaffCreateCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCharacter/StaffCreateCharacter']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCharacter/StaffSearchCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCharacter/StaffSearchCharacter']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCharacter/StaffViewCharacter/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCharacter/StaffViewCharacter']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCategory/StaffCreateCategory/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCategory/StaffCreateCategory']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCategory/StaffSearchCategories/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCategory/StaffSearchCategories']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCategory/StaffViewCategory/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCategory/StaffViewCategory']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffRules/StaffSearchRules/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffRules/StaffSearchRules']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffRules/StaffCreateRule/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffRules/StaffCreateRule']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffRules/StaffViewRule/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffRules/StaffViewRule']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffSeries/StaffCreateSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffSeries/StaffCreateSeries']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffSeries/StaffSearchSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffSeries/StaffSearchSeries']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffSeries/StaffViewSeries/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffSeries/StaffViewSeries']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCancellationReasons/StaffCreateCancellationReason/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCancellationReasons/StaffCreateCancellationReason']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCancellationReasons/StaffSearchCancellationReasons/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCancellationReasons/StaffSearchCancellationReasons']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffCancellationReasons/StaffViewCancellationReason/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffCancellationReasons/StaffViewCancellationReason']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAccount/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAccount']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffClub/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffClub']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAccountClubSupporterSubscription/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAccountClubSupporterSubscription']
    },
    {
      path: 'src/client/domain/Staff/pages/StaffAccountTransaction/__locale__/{locale}/index',
      include: ['src/client/domain/Staff/pages/StaffAccountTransaction']
    }
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}
