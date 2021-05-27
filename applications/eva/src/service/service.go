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

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx)
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
	userRepo := adapters.NewUserCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			RedeemCookie:   command.NewRedeemCookieHandler(cookieRepo, userRepo),
			Register:       command.NewRegisterHandler(cookieRepo, userRepo),
			Authentication: command.NewAuthenticationHandler(cookieRepo, userRepo),
			Authenticate:   command.NewAuthenticateHandler(cookieRepo),
			Logout:         command.NewLogoutHandler(userRepo),
		},
		Queries: app.Queries{
			GetUser: query.NewGetUserHandler(userRepo),
		},
	}
}
