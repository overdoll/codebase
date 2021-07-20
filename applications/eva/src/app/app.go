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
	AccountById                     query.AccountByIdHandler
	AccountByEmail                  query.AccountByEmailHandler
	AccountByUsername               query.AccountByUsernameHandler
	AccountEmailByEmail             query.AccountEmailByEmailHandler
	AccountEmailsByAccount          query.AccountEmailsByAccountHandler
	AccountUsernameByUsername       query.AccountUsernameByUsernameHandler
	AccountUsernamesByAccount       query.AccountUsernamesByAccountHandler
	AccountSessionById              query.AccountSessionByIdHandler
	AccountSessionsByAccount        query.AccountSessionsByAccountHandler
	AccountRecoveryCodesByAccount   query.AccountRecoveryCodesByAccountHandler
	IsAccountMultiFactorTOTPEnabled query.IsAccountMultiFactorTOTPEnabledHandler
	AuthenticationTokenById         query.AuthenticationTokenByIdHandler
}
