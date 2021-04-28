package service

import (
	"context"
	"log"
	"os"

	"github.com/gomodule/redigo/redis"
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

	init, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	// Redis
	redisSvc, err := redis.Dial("tcp", os.Getenv("REDIS_URL"), redis.DialDatabase(1))

	if err != nil {
		log.Fatalf("failed to connect to redis: %s", err)
	}

	cookieRepo := adapters.NewCookieCassandraRepository(session)
	userRepo := adapters.NewUserCassandraRepository(session)
	sessionRepo := adapters.NewSessionRedisRepository(redisSvc)

	return app.Application{
		Commands: app.Commands{
			CreateCookie:       command.NewCreateCookieHandler(cookieRepo),
			RedeemCookie:       command.NewRedeemCookieHandler(cookieRepo, userRepo),
			RegisterFromCookie: command.NewRegisterFromCookieHandler(cookieRepo, userRepo),

			ValidateSession: command.NewValidateSessionHandler(userRepo, sessionRepo),
			CreateSession:   command.NewCreateSessionHandler(userRepo, sessionRepo),
			RevokeSession:   command.NewRevokeSessionHandler(userRepo, sessionRepo),
		},
		Queries: app.Queries{
			GetCookie: query.NewGetCookieHandler(cookieRepo),
			GetUser:   query.NewGetUserHandler(userRepo),
		},
	}
}
