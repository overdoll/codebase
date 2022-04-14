const GeneralCatalogs = [
  {
    path: 'src/domain/app/__locale__/{locale}/index',
    include: ['src/modules/', 'src/common/components/', 'src/domain/root/']
  },
  {
    path: 'src/domain/join/__locale__/{locale}/index',
    include: ['src/domain/join/']
  },
  {
    path: 'src/domain/home/__locale__/{locale}/index',
    include: ['src/domain/home/']
  },
  {
    path: 'src/domain/verify-token/__locale__/{locale}/index',
    include: ['src/domain/verify-token/']
  },
  {
    path: 'src/domain/404/__locale__/{locale}/index',
    include: ['src/domain/404/']
  },
  {
    path: 'src/domain/confirm-email/__locale__/{locale}/index',
    include: ['src/domain/confirm-email/']
  },
  {
    path: 'src/domain/help/__locale__/{locale}/index',
    include: ['src/domain/help/']
  },
  {
    path: 'src/domain/search/__locale__/{locale}/index',
    include: ['src/domain/search/']
  },
  {
    path: 'src/domain/logout/__locale__/{locale}/index',
    include: ['src/domain/logout/']
  },
  {
    path: 'src/domain/profile/__locale__/{locale}/index',
    include: ['src/domain/profile/']
  }
]

const SettingsCatalogs = [
  {
    path: 'src/domain/settings/profile/root/__locale__/{locale}/index',
    include: ['src/domain/settings/profile/root/']
  },
  {
    path: 'src/domain/settings/profile/username/__locale__/{locale}/index',
    include: ['src/domain/settings/profile/username/']
  },
  {
    path: 'src/domain/settings/profile/emails/__locale__/{locale}/index',
    include: ['src/domain/settings/profile/emails/']
  },
  {
    path: 'src/domain/settings/security/root/__locale__/{locale}/index',
    include: ['src/domain/settings/security/root/']
  },
  {
    path: 'src/domain/settings/security/recovery-codes/__locale__/{locale}/index',
    include: ['src/domain/settings/security/recovery-codes/']
  },
  {
    path: 'src/domain/settings/security/sessions/__locale__/{locale}/index',
    include: ['src/domain/settings/security/sessions/']
  },
  {
    path: 'src/domain/settings/security/totp/__locale__/{locale}/index',
    include: ['src/domain/settings/security/totp/']
  },
  {
    path: 'src/domain/settings/billing/root/__locale__/{locale}/index',
    include: ['src/domain/settings/billing/root/']
  },
  {
    path: 'src/domain/settings/billing/payment-methods/__locale__/{locale}/index',
    include: ['src/domain/settings/billing/payment-methods/']
  },
  {
    path: 'src/domain/settings/billing/subscriptions/__locale__/{locale}/index',
    include: ['src/domain/settings/billing/subscriptions/']
  },
  {
    path: 'src/domain/settings/billing/subscription/__locale__/{locale}/index',
    include: ['src/domain/settings/billing/subscription/']
  },
  {
    path: 'src/domain/settings/billing/transactions/__locale__/{locale}/index',
    include: ['src/domain/settings/billing/transactions/']
  },
  {
    path: 'src/domain/settings/preferences/root/__locale__/{locale}/index',
    include: ['src/domain/settings/preferences/root/']
  },
  {
    path: 'src/domain/settings/preferences/curation-profile/__locale__/{locale}/index',
    include: ['src/domain/settings/preferences/curation-profile/']
  },
  {
    path: 'src/domain/settings/moderation/__locale__/{locale}/index',
    include: ['src/domain/settings/moderation/']
  }
]

const ClubCatalog = [
  {
    path: 'src/domain/club/create-post/__locale__/{locale}/index',
    include: ['src/domain/club/create-post/']
  },
  {
    path: 'src/domain/club/home/__locale__/{locale}/index',
    include: ['src/domain/club/home/']
  },
  {
    path: 'src/domain/club/members/__locale__/{locale}/index',
    include: ['src/domain/club/members/']
  },
  {
    path: 'src/domain/club/posts/__locale__/{locale}/index',
    include: ['src/domain/club/posts/']
  },
  {
    path: 'src/domain/club/settings/root/__locale__/{locale}/index',
    include: ['src/domain/club/settings/root/']
  },
  {
    path: 'src/domain/club/settings/aliases/__locale__/{locale}/index',
    include: ['src/domain/club/settings/aliases/']
  },
  {
    path: 'src/domain/club/settings/name/__locale__/{locale}/index',
    include: ['src/domain/club/settings/name/']
  },
  {
    path: 'src/domain/club/settings/thumbnail/__locale__/{locale}/index',
    include: ['src/domain/club/settings/thumbnail/']
  }
]

const ClubsCatalog = [
  {
    path: 'src/domain/clubs/root/__locale__/{locale}/index',
    include: ['src/domain/clubs/root/']
  },
  {
    path: 'src/domain/clubs/create-club/__locale__/{locale}/index',
    include: ['src/domain/clubs/create-club/']
  },
  {
    path: 'src/domain/[slug]/root/__locale__/{locale}/index',
    include: ['src/domain/[slug]/root/']
  },
  {
    path: 'src/domain/[slug]/p/__locale__/{locale}/index',
    include: ['src/domain/[slug]/p/']
  },
  {
    path: 'src/domain/[slug]/posts/__locale__/{locale}/index',
    include: ['src/domain/[slug]/posts/']
  }
]

const ModerationCatalog = [
  {
    path: 'src/domain/moderation/audit-logs/__locale__/{locale}/index',
    include: ['src/domain/moderation/audit-logs/']
  },
  {
    path: 'src/domain/moderation/post-queue/__locale__/{locale}/index',
    include: ['src/domain/moderation/post-queue/']
  },
  {
    path: 'src/domain/moderation/post-reports/__locale__/{locale}/index',
    include: ['src/domain/moderation/post-reports/']
  }
]

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
    ...GeneralCatalogs,
    ...SettingsCatalogs,
    ...ClubCatalog,
    ...ClubsCatalog,
    ...ModerationCatalog
  ],
  format: 'po',
  fallbackLocales: {
    default: 'en'
  }
}

/*
{
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
      path: 'src/client/domain/PublicClub/__locale__/{locale}/index',
      include: ['src/client/domain/PublicClub']
    },
    {
      path: 'src/client/domain/PublicClubPosts/__locale__/{locale}/index',
      include: ['src/client/domain/PublicClubPosts']
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
 */
