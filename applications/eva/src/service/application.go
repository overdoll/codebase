package service

import (
	"context"
	"log"

	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/app/query"
	"overdoll/libraries/bootstrap"
)

func NewApplication(ctx context.Context) (app.Application, func()) {
	return createApplication(ctx),
		func() {

		}
}

func createApplication(ctx context.Context) app.Application {

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := bootstrap.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	redis, err := bootstrap.InitializeRedisSession()

	if err != nil {
		log.Fatalf("redis session failed with errors: %s", err)
	}

	// need to use a custom DB redis session because sessions are stored in db 0 in express-session
	redis2, err := bootstrap.InitializeRedisSessionWithCustomDB(0)

	if err != nil {
		log.Fatalf("redis session failed with errors: %s", err)
	}

	tokenRepo := adapters.NewAuthenticationTokenRedisRepository(redis)
	sessionRepo := adapters.NewSessionRepository(redis2)
	accountRepo := adapters.NewAccountCassandraRedisRepository(session, redis)
	mfaRepo := adapters.NewMultiFactorCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			VerifyAuthenticationToken:                            command.NewVerifyAuthenticationTokenHandler(tokenRepo, accountRepo),
			ConsumeAuthenticationToken:                           command.NewConsumeAuthenticationTokenHandler(tokenRepo, accountRepo, mfaRepo),
			CreateAccountWithAuthenticationToken:                 command.NewCreateAccountWithAuthenticationTokenHandler(tokenRepo, accountRepo),
			GrantAuthenticationToken:                             command.NewGrantAuthenticationTokenHandler(tokenRepo),
			LockAccount:                                          command.NewLockUserHandler(accountRepo),
			CreateAccount:                                        command.NewCreateUserHandler(accountRepo),
			UnlockAccount:                                        command.NewUnlockUserHandler(accountRepo),
			AddAccountEmail:                                      command.NewAddAccountEmailHandler(accountRepo),
			ConfirmAccountEmail:                                  command.NewConfirmAccountEmailHandler(accountRepo),
			UpdateAccountUsernameAndRetainPrevious:               command.NewUpdateAccountUsernameAndRetainPreviousHandler(accountRepo),
			RevokeAccountSession:                                 command.NewRevokeAccountSessionHandler(sessionRepo),
			UpdateAccountEmailStatusToPrimary:                    command.NewUpdateAccountEmailStatusToPrimaryHandler(accountRepo),
			GenerateAccountMultiFactorRecoveryCodes:              command.NewGenerateAccountMultiFactorRecoveryCodesHandler(mfaRepo),
			GenerateAccountMultiFactorTOTP:                       command.NewGenerateAccountMultiFactorTOTP(mfaRepo, accountRepo),
			EnrollAccountMultiFactorTOTP:                         command.NewEnrollAccountMultiFactorTOTPHandler(mfaRepo, accountRepo),
			DisableAccountMultiFactor:                            command.NewDisableAccountMultiFactorHandler(mfaRepo, accountRepo),
			GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotp: command.NewGrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler(tokenRepo, accountRepo, mfaRepo),
			DeleteAccountEmail:                                   command.NewDeleteAccountEmailHandler(accountRepo),
		},
		Queries: app.Queries{
			AccountById:                     query.NewAccountByIdHandler(accountRepo),
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
