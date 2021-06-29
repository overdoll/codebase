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
	RedeemCookie        command.RedeemCookieHandler
	Authenticate        command.AuthenticateHandler
	Register            command.RegisterHandler
	Authentication      command.AuthenticationHandler
	LockAccount         command.LockAccountHandler
	UnlockAccount       command.UnlockAccountHandler
	CreateAccount       command.CreateAccountHandler
	AddAccountEmail     command.AddAccountEmailHandler
	ConfirmAccountEmail command.ConfirmAccountEmailHandler
}

type Queries struct {
	GetAccount       query.GetAccountHandler
	GetAccountEmails query.GetAccountEmailsHandler
}
