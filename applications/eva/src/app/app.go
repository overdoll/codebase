package app

import (
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	CreateCookie       command.CreateCookieHandler
	RedeemCookie       command.RedeemCookieHandler
	RegisterFromCookie command.RegisterFromCookieHandler

	RevokeSession   command.RevokeSessionHandler
	CreateSession   command.CreateSessionHandler
	ValidateSession command.ValidateSessionHandler
}

type Queries struct {
	GetCookie query.GetCookieHandler
	GetUser   query.GetUserHandler
}
