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
	DisableAccountMultiFactor      command.DisableAccountMultiFactorHandler
	FinishAuthenticateMultiFactor  command.FinishAuthenticateMultiFactorHandler
	RemoveAccountEmail             command.RemoveAccountEmailHandler
}

type Queries struct {
	GetAccount                      query.GetAccountHandler
	GetAccountByEmail               query.GetAccountByEmailHandler
	GetAccountByUsername            query.GetAccountByUsernameHandler
	GetAccountEmail                 query.GetAccountEmailHandler
	GetAccountEmails                query.GetAccountEmailsHandler
	GetAccountUsername              query.GetAccountUsernameHandler
	GetAccountUsernames             query.GetAccountUsernamesHandler
	GetAccountSession               query.GetAccountSessionHandler
	GetAccountSessions              query.GetAccountSessionsHandler
	GetAccountRecoveryCodes         query.GetAccountRecoveryCodesHandler
	IsAccountMultiFactorTOTPEnabled query.IsAccountTOTPMultiFactorEnabledHandler
	GetAuthenticationTokenStatus    query.GetAuthenticationTokenStatusHandler
}
