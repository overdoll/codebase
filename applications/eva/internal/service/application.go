package service

import (
	"context"
	"github.com/oschwald/geoip2-golang"
	"go.uber.org/zap"
	"os"
	"overdoll/applications/eva/internal/adapters"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	carrierClient, cleanup := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))

	return createApplication(ctx, adapters.NewCarrierGrpc(carrierClient)),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	// mock out carrier so we don't have to send emails in tests
	// we "send" emails by placing them inside of a redis DB to be read later from tests
	return createApplication(ctx, NewCarrierServiceMock()),
		func() {
		}
}

func createApplication(ctx context.Context, carrier command.CarrierService) app.Application {

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
	mfaRepo := adapters.NewMultiFactorCassandraRepository(session)
	locationRepo := adapters.NewLocationMaxmindRepository(db)

	return app.Application{
		Commands: app.Commands{
			VerifyAuthenticationToken:                 command.NewVerifyAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAccountAccessWithAuthenticationToken: command.NewGrantAccountAccessWithAuthenticationTokenHandler(tokenRepo, accountRepo, mfaRepo),
			CreateAccountWithAuthenticationToken:      command.NewCreateAccountWithAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAuthenticationToken:                  command.NewGrantAuthenticationTokenHandler(tokenRepo, locationRepo, carrier),
			LockAccount:                               command.NewLockAccountHandler(accountRepo),
			UnlockAccount:                             command.NewUnlockUserHandler(accountRepo),
			AddAccountEmail:                           command.NewAddAccountEmailHandler(accountRepo, confirmEmailRepo, carrier),
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(accountRepo, confirmEmailRepo),
			UpdateAccountUsername:                     command.NewUpdateAccountUsernameHandler(accountRepo),
			RevokeAccountSession:                      command.NewRevokeAccountSessionHandler(sessionRepo),
			UpdateAccountEmailStatusToPrimary:         command.NewUpdateAccountEmailStatusToPrimaryHandler(accountRepo),
			GenerateAccountMultiFactorRecoveryCodes:   command.NewGenerateAccountMultiFactorRecoveryCodesHandler(mfaRepo),
			GenerateAccountMultiFactorTOTP:            command.NewGenerateAccountMultiFactorTOTP(mfaRepo, accountRepo),
			EnrollAccountMultiFactorTOTP:              command.NewEnrollAccountMultiFactorTOTPHandler(mfaRepo, accountRepo),
			DisableAccountMultiFactor:                 command.NewDisableAccountMultiFactorHandler(mfaRepo, accountRepo),
			DeleteAccountEmail:                        command.NewDeleteAccountEmailHandler(accountRepo),
			RevokeAuthenticationToken:                 command.NewRevokeAuthenticationTokenHandler(tokenRepo),

			RevokeAccountModeratorRole: command.NewRevokeAccountModeratorRoleHandler(accountRepo),
			RevokeAccountStaffRole:     command.NewRevokeAccountStaffRoleHandler(accountRepo),
			AssignAccountModeratorRole: command.NewAssignAccountModeratorRoleHandler(accountRepo),
			AssignAccountStaffRole:     command.NewAssignAccountStaffRoleHandler(accountRepo),

			CreateAccountSessionOperator: command.NewCreateAccountSessionOperatorHandler(sessionRepo, locationRepo),
			TouchAccountSessionOperator:  command.NewTouchAccountSessionOperatorHandler(sessionRepo),
			RevokeAccountSessionOperator: command.NewRevokeAccountSessionOperatorHandler(sessionRepo),
		},
		Queries: app.Queries{
			AccountById:            query.NewAccountByIdHandler(accountRepo),
			AccountsByIds:          query.NewAccountsByIdsHandler(accountRepo),
			AccountByEmail:         query.NewAccountByEmailHandler(accountRepo),
			AccountByUsername:      query.NewAccountByUsernameHandler(accountRepo),
			AccountEmailsByAccount: query.NewGetAccountEmailsHandler(accountRepo),
			AccountEmailByEmail:    query.NewAccountEmailByEmailHandler(accountRepo),
			AccountSessionById:     query.NewAccountSessionByIdHandler(sessionRepo),

			AreAccountMultiFactorRecoveryCodesGenerated: query.NewAreAccountMultiFactorRecoveryCodesGeneratedHandler(mfaRepo),
			AccountSessionsByAccount:                    query.NewAccountSessionsByAccountHandler(sessionRepo),
			AccountRecoveryCodesByAccount:               query.NewAccountRecoveryCodesByAccountHandler(mfaRepo),
			IsAccountMultiFactorTOTPEnabled:             query.NewIsAccountMultiFactorTOTPEnabledHandler(mfaRepo),
			ViewAuthenticationToken:                     query.NewViewAuthenticationTokenHandler(tokenRepo, accountRepo, mfaRepo),
			AccountEmailsLimit:                          query.NewAccountEmailsLimitHandler(accountRepo),

			LocationFromIp: query.NewLocationFromIpHandler(locationRepo),
		},
	}
}
