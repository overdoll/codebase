package service

import (
	"context"
	"os"

	"overdoll/applications/eva/internal/adapters"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	carrierClient, cleanup := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))

	return createApplication(ctx, adapters.NewCarrierGrpc(carrierClient)),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, carrier command.CarrierService) app.Application {

	bootstrap.NewBootstrap(ctx)

	session := bootstrap.InitializeDatabaseSession()

	redis := bootstrap.InitializeRedisSession()

	client := bootstrap.InitializeElasticSearchSession()

	// need to use a custom DB redis session because sessions are stored in db 0 in express-session
	redis2 := bootstrap.InitializeRedisSessionWithCustomDB(0)

	tokenRepo := adapters.NewAuthenticationTokenRedisRepository(redis)
	sessionRepo := adapters.NewSessionRepository(redis2)
	accountRepo := adapters.NewAccountCassandraRedisRepository(session, redis)
	accountIndexRepo := adapters.NewAccountIndexElasticSearchRepository(client, session)
	mfaRepo := adapters.NewMultiFactorCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			VerifyAuthenticationToken:                 command.NewVerifyAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAccountAccessWithAuthenticationToken: command.NewGrantAccountAccessWithAuthenticationTokenHandler(tokenRepo, accountRepo, mfaRepo),
			CreateAccountWithAuthenticationToken:      command.NewCreateAccountWithAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAuthenticationToken:                  command.NewGrantAuthenticationTokenHandler(tokenRepo, carrier),
			LockAccountOperator:                       command.NewLockAccountOperatorHandler(accountRepo),
			UnlockAccount:                             command.NewUnlockUserHandler(accountRepo),
			AddAccountEmail:                           command.NewAddAccountEmailHandler(accountRepo, carrier),
			ConfirmAccountEmail:                       command.NewConfirmAccountEmailHandler(accountRepo),
			UpdateAccountUsernameAndRetainPrevious:    command.NewUpdateAccountUsernameAndRetainPreviousHandler(accountRepo),
			RevokeAccountSession:                      command.NewRevokeAccountSessionHandler(sessionRepo),
			UpdateAccountEmailStatusToPrimary:         command.NewUpdateAccountEmailStatusToPrimaryHandler(accountRepo),
			GenerateAccountMultiFactorRecoveryCodes:   command.NewGenerateAccountMultiFactorRecoveryCodesHandler(mfaRepo),
			GenerateAccountMultiFactorTOTP:            command.NewGenerateAccountMultiFactorTOTP(mfaRepo, accountRepo),
			EnrollAccountMultiFactorTOTP:              command.NewEnrollAccountMultiFactorTOTPHandler(mfaRepo, accountRepo),
			DisableAccountMultiFactor:                 command.NewDisableAccountMultiFactorHandler(mfaRepo, accountRepo),
			DeleteAccountEmail:                        command.NewDeleteAccountEmailHandler(accountRepo),
			RevokeAuthenticationToken:                 command.NewRevokeAuthenticationTokenHandler(tokenRepo),
			ReissueAuthenticationToken:                command.NewReissueAuthenticationTokenHandler(tokenRepo, carrier),
			IndexAllAccounts:                          command.NewIndexAllAccountsHandler(accountRepo, accountIndexRepo),

			RevokeAccountModeratorRole: command.NewRevokeAccountModeratorRoleHandler(accountRepo),
			RevokeAccountStaffRole:     command.NewRevokeAccountStaffRoleHandler(accountRepo),

			AssignAccountModeratorRole: command.NewAssignAccountModeratorRoleHandler(accountRepo),
			AssignAccountStaffRole:     command.NewAssignAccountStaffRoleHandler(accountRepo),
		},
		Queries: app.Queries{
			SearchAccounts:                  query.NewSearchAccountsHandler(accountIndexRepo),
			AccountById:                     query.NewAccountByIdHandler(accountRepo),
			AccountsById:                    query.NewAccountsByIdHandler(accountRepo),
			AccountByEmail:                  query.NewAccountByEmailHandler(accountRepo),
			AccountByUsername:               query.NewAccountByUsernameHandler(accountRepo),
			AccountEmailsByAccount:          query.NewGetAccountEmailsHandler(accountRepo),
			AccountEmailByEmail:             query.NewAccountEmailByEmailHandler(accountRepo),
			AccountUsernamesByAccount:       query.NewAccountUsernamesByAccountHandler(accountRepo),
			AccountUsernameByUsername:       query.NewAccountUsernameByUsernameHandler(accountRepo),
			AccountSessionById:              query.NewAccountSessionByIdHandler(sessionRepo),
			AccountSessionsByAccount:        query.NewAccountSessionsByAccountHandler(sessionRepo),
			AccountRecoveryCodesByAccount:   query.NewAccountRecoveryCodesByAccountHandler(mfaRepo),
			IsAccountMultiFactorTOTPEnabled: query.NewIsAccountMultiFactorTOTPEnabledHandler(mfaRepo),
			AuthenticationTokenById:         query.NewAuthenticationTokenByIdHandler(tokenRepo, accountRepo, mfaRepo),
		},
	}
}
