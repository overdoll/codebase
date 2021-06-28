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

	cookieRepo := adapters.NewCookieCassandraRepository(session)
	userRepo := adapters.NewAccountCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			RedeemCookie:   command.NewRedeemCookieHandler(cookieRepo, userRepo),
			Register:       command.NewRegisterHandler(cookieRepo, userRepo),
			Authentication: command.NewAuthenticationHandler(cookieRepo, userRepo),
			Authenticate:   command.NewAuthenticateHandler(cookieRepo),
			LockAccount:    command.NewLockUserHandler(userRepo),
			CreateAccount:  command.NewCreateUserHandler(userRepo),
		},
		Queries: app.Queries{
			GetAccount: query.NewGetUserHandler(userRepo),
		},
	}
}
