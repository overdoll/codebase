package app

import (
	"overdoll/applications/carrier/internal/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	ConfirmAccountEmail command.ConfirmAccountEmailHandler
	NewLoginToken       command.NewLoginTokenHandler
}

type Queries struct{}
