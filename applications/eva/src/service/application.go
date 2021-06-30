package service

import (
	"context"
	"log"

	"github.com/spf13/viper"
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

	session, err := bootstrap.InitializeDatabaseSession(viper.GetString("db.keyspace"))

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	redis, err := bootstrap.InitializeRedisSession(viper.GetInt("redis.db"))

	if err != nil {
		log.Fatalf("redis session failed with errors: %s", err)
	}

	cookieRepo := adapters.NewCookieRedisRepository(redis)
	accountRepo := adapters.NewAccountCassandraRedisRepository(session, redis)

	return app.Application{
		Commands: app.Commands{
			RedeemCookie:          command.NewRedeemCookieHandler(cookieRepo, accountRepo),
			Register:              command.NewRegisterHandler(cookieRepo, accountRepo),
			Authentication:        command.NewAuthenticationHandler(cookieRepo, accountRepo),
			Authenticate:          command.NewAuthenticateHandler(cookieRepo),
			LockAccount:           command.NewLockUserHandler(accountRepo),
			CreateAccount:         command.NewCreateUserHandler(accountRepo),
			UnlockAccount:         command.NewUnlockUserHandler(accountRepo),
			AddAccountEmail:       command.NewAddAccountEmailHandler(accountRepo),
			ConfirmAccountEmail:   command.NewConfirmAccountEmailHandler(accountRepo),
			ModifyAccountUsername: command.NewModifyAccountUsernameHandler(accountRepo),
		},
		Queries: app.Queries{
			GetAccount:          query.NewGetAccountHandler(accountRepo),
			GetAccountEmails:    query.NewGetAccountEmailsHandler(accountRepo),
			GetAccountUsernames: query.NewGetAccountUsernamesHandler(accountRepo),
		},
	}
}
