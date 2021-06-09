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
	RedeemCookie   command.RedeemCookieHandler
	Authenticate   command.AuthenticateHandler
	Register       command.RegisterHandler
	Logout         command.LogoutHandler
	Authentication command.AuthenticationHandler
	LockUser       command.LockUserHandler
	CreateUser     command.CreateUserHandler
}

type Queries struct {
	GetUser query.GetUserHandler
}
