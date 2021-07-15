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
	RedeemAuthenticationToken      command.RedeemAuthenticationTokenHandler
	ConsumeAuthenticationToken     command.ConsumeAuthenticationTokenHandler
	Authenticate                   command.AuthenticateHandler
	Register                       command.RegisterHandler
	LockAccount                    command.LockAccountHandler
	UnlockAccount                  command.UnlockAccountHandler
	CreateAccount                  command.CreateAccountHandler
	AddAccountEmail                command.AddAccountEmailHandler
	ModifyAccountUsername          command.ModifyAccountUsernameHandler
	ConfirmAccountEmail            command.ConfirmAccountEmailHandler
	RevokeAccountSession           command.RevokeAccountSessionHandler
	MakeAccountEmailPrimary        command.MakeAccountEmailPrimaryHandler
	GenerateAccountRecoveryCodes   command.GenerateAccountRecoveryCodesHandler
	GenerateAccountMultiFactorTOTP command.GenerateAccountMultiFactorTOTPHandler
	EnrollAccountMultiFactorTOTP   command.EnrollAccountMultiFactorTOTPHandler
	ToggleAccountMultiFactor       command.ToggleAccountMultiFactorHandler
	FinishAuthenticateMultiFactor  command.FinishAuthenticateMultiFactorHandler
}

type Queries struct {
	GetAccount                      query.GetAccountHandler
	GetAccountEmails                query.GetAccountEmailsHandler
	GetAccountUsernames             query.GetAccountUsernamesHandler
	GetAccountSessions              query.GetAccountSessionsHandler
	GetAccountRecoveryCodes         query.GetAccountRecoveryCodesHandler
	IsAccountMultiFactorTOTPEnabled query.IsAccountTOTPMultiFactorEnabledHandler
	GetAuthenticationToken          query.GetAuthenticationTokenHandler
}
