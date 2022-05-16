package service

import (
	"context"
	"github.com/oschwald/geoip2-golang"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"go.uber.org/zap"
	"os"
	"overdoll/applications/eva/internal/adapters"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/testing_tools/mocks"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	carrierClient, cleanup := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))
	hadesClient, cleanup2 := clients.NewHadesClient(ctx, os.Getenv("HADES_SERVICE"))
	stellaClient, cleanup3 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))
	parleyClient, cleanup4 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))
	stingClient, cleanup5 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	ringerClient, cleanup6 := clients.NewRingerClient(ctx, os.Getenv("RINGER_SERVICE"))

	return createApplication(
			ctx,
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewHadesGrpc(hadesClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewRingerGrpc(ringerClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewStingGrpc(stingClient),
			clients.NewTemporalClient(ctx),
		),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
			cleanup4()
			cleanup5()
			cleanup6()
		}
}

type ComponentTestApplication struct {
	App            app.Application
	TemporalClient *temporalmocks.Client
	CarrierClient  *mocks.MockCarrierClient
	HadesClient    *mocks.MockHadesClient
	StellaClient   *mocks.MockStellaClient
	RingerClient   *mocks.MockRingerClient
	ParleyClient   *mocks.MockParleyClient
	StingClient    *mocks.MockStingClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap(ctx)
	temporalClient := &temporalmocks.Client{}

	carrierClient := &mocks.MockCarrierClient{}
	hadesClient := &mocks.MockHadesClient{}
	stellaClient := &mocks.MockStellaClient{}
	ringerClient := &mocks.MockRingerClient{}
	parleyClient := &mocks.MockParleyClient{}
	stingClient := &mocks.MockStingClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewHadesGrpc(hadesClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewRingerGrpc(ringerClient),
			adapters.NewParleyGrpc(parleyClient),
			adapters.NewStingGrpc(stingClient),
			clients.NewTemporalClient(ctx),
		),
		TemporalClient: temporalClient,
		CarrierClient:  carrierClient,
		HadesClient:    hadesClient,
		StellaClient:   stellaClient,
		RingerClient:   ringerClient,
		ParleyClient:   parleyClient,
		StingClient:    stingClient,
	}
}

func createApplication(
	ctx context.Context,
	carrier command.CarrierService,
	hades command.HadesService,
	stella command.StellaService,
	ringer command.RingerService,
	parley command.ParleyService,
	sting command.StingService,
	client client.Client,
) app.Application {

	bootstrap.NewBootstrap(ctx)

	session := bootstrap.InitializeDatabaseSession()

	redis := bootstrap.InitializeRedisSession()

	db, err := geoip2.Open(config.GetFilePath(os.Getenv("GEOIP_DATABASE_LOCATION")))

	if err != nil {
		zap.S().Fatal("failed to open database", zap.Error(err))
	}

	tokenRepo := adapters.NewAuthenticationTokenRedisRepository(redis)
	sessionRepo := adapters.NewSessionRepository(redis)
	accountRepo := adapters.NewAccountCassandraRedisRepository(session)
	confirmEmailRepo := adapters.NewConfirmEmailRedisRepository(redis)
	locationRepo := adapters.NewLocationMaxmindRepository(db)
	eventRepo := adapters.NewEventTemporalRepository(client)

	return app.Application{
		Commands: app.Commands{
			VerifyAuthenticationToken:                 command.NewVerifyAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAccountAccessWithAuthenticationToken: command.NewGrantAccountAccessWithAuthenticationTokenHandler(tokenRepo, accountRepo),
			CreateAccountWithAuthenticationToken:      command.NewCreateAccountWithAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAuthenticationToken:                  command.NewGrantAuthenticationTokenHandler(tokenRepo, locationRepo, carrier),
			LockAccount:                               command.NewLockAccountHandler(accountRepo),
			UnlockAccount:                             command.NewUnlockUserHandler(accountRepo),
			AddAccountEmail:                           command.NewAddAccountEmailHandler(accountRepo, confirmEmailRepo, carrier),
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(accountRepo, confirmEmailRepo),
			UpdateAccountUsername:                     command.NewUpdateAccountUsernameHandler(accountRepo),
			RevokeAccountSession:                      command.NewRevokeAccountSessionHandler(sessionRepo),
			UpdateAccountEmailStatusToPrimary:         command.NewUpdateAccountEmailStatusToPrimaryHandler(accountRepo),
			GenerateAccountMultiFactorRecoveryCodes:   command.NewGenerateAccountMultiFactorRecoveryCodesHandler(accountRepo),
			GenerateAccountMultiFactorTOTP:            command.NewGenerateAccountMultiFactorTOTP(accountRepo),
			EnrollAccountMultiFactorTOTP:              command.NewEnrollAccountMultiFactorTOTPHandler(accountRepo),
			DisableAccountMultiFactor:                 command.NewDisableAccountMultiFactorHandler(accountRepo),
			DeleteAccountEmail:                        command.NewDeleteAccountEmailHandler(accountRepo),
			RevokeAuthenticationToken:                 command.NewRevokeAuthenticationTokenHandler(tokenRepo),

			RevokeAccountModeratorRole: command.NewRevokeAccountModeratorRoleHandler(accountRepo),
			RevokeAccountStaffRole:     command.NewRevokeAccountStaffRoleHandler(accountRepo),
			RevokeAccountArtistRole:    command.NewRevokeAccountArtistRoleHandler(accountRepo),
			AssignAccountModeratorRole: command.NewAssignAccountModeratorRoleHandler(accountRepo),
			AssignAccountStaffRole:     command.NewAssignAccountStaffRoleHandler(accountRepo),
			AssignAccountArtistRole:    command.NewAssignAccountArtistRoleHandler(accountRepo),

			CreateAccountSessionOperator: command.NewCreateAccountSessionOperatorHandler(sessionRepo, accountRepo, locationRepo),
			TouchAccountSessionOperator:  command.NewTouchAccountSessionOperatorHandler(sessionRepo),
			RevokeAccountSessionOperator: command.NewRevokeAccountSessionOperatorHandler(sessionRepo),

			CancelAccountDeletion: command.NewCancelAccountDeletionHandler(accountRepo, eventRepo),
			DeleteAccount:         command.NewDeleteAccountHandler(accountRepo, eventRepo, hades, stella),
		},
		Queries: app.Queries{
			AccountById:            query.NewAccountByIdHandler(accountRepo),
			AccountsByIds:          query.NewAccountsByIdsHandler(accountRepo),
			AccountByEmail:         query.NewAccountByEmailHandler(accountRepo),
			AccountByUsername:      query.NewAccountByUsernameHandler(accountRepo),
			AccountEmailsByAccount: query.NewGetAccountEmailsHandler(accountRepo),
			AccountEmailByEmail:    query.NewAccountEmailByEmailHandler(accountRepo),
			AccountSessionById:     query.NewAccountSessionByIdHandler(sessionRepo),

			AreAccountMultiFactorRecoveryCodesGenerated: query.NewAreAccountMultiFactorRecoveryCodesGeneratedHandler(accountRepo),
			AccountSessionsByAccount:                    query.NewAccountSessionsByAccountHandler(sessionRepo),
			AccountRecoveryCodesByAccount:               query.NewAccountRecoveryCodesByAccountHandler(accountRepo),
			IsAccountMultiFactorTOTPEnabled:             query.NewIsAccountMultiFactorTOTPEnabledHandler(accountRepo),
			ViewAuthenticationToken:                     query.NewViewAuthenticationTokenHandler(tokenRepo, accountRepo),
			AccountEmailsLimit:                          query.NewAccountEmailsLimitHandler(accountRepo),

			LocationFromIp: query.NewLocationFromIpHandler(locationRepo),
		},
		Activities: activities.NewActivitiesHandler(
			accountRepo,
			sessionRepo,
			hades,
			stella,
			sting,
			parley,
			ringer,
			carrier,
		),
	}
}
