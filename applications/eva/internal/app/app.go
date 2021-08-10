package app

import (
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	VerifyAuthenticationToken               command.VerifyAuthenticationTokenHandler
	GrantAuthenticationToken                command.GrantAuthenticationTokenHandler
	UnlockAccount                           command.UnlockAccountHandler
	AddAccountEmail                         command.AddAccountEmailHandler
	UpdateAccountUsernameAndRetainPrevious  command.UpdateAccountUsernameAndRetainPreviousHandler
	ConfirmAccountEmail                     command.ConfirmAccountEmailHandler
	RevokeAccountSession                    command.RevokeAccountSessionHandler
	UpdateAccountEmailStatusToPrimary       command.UpdateAccountEmailStatusToPrimaryHandler
	GenerateAccountMultiFactorRecoveryCodes command.GenerateAccountMultiFactorRecoveryCodesHandler
	GenerateAccountMultiFactorTOTP          command.GenerateAccountMultiFactorTOTPHandler
	EnrollAccountMultiFactorTOTP            command.EnrollAccountMultiFactorTOTPHandler
	DisableAccountMultiFactor               command.DisableAccountMultiFactorHandler
	DeleteAccountEmail                      command.DeleteAccountEmailHandler
	RevokeAuthenticationToken               command.RevokeAuthenticationTokenHandler
	ReissueAuthenticationToken              command.ReissueAuthenticationTokenHandler
	IndexAllAccounts                        command.IndexAllAccountsHandler

	CreateAccountWithAuthenticationToken      command.CreateAccountWithAuthenticationTokenHandler
	GrantAccountAccessWithAuthenticationToken command.GrantAccountAccessWithAuthenticationTokenHandler

	// operator handlers don't do any permission checks
	LockAccountOperator command.LockAccountOperatorHandler
}

type Queries struct {
	SearchAccounts                  query.SearchAccountsHandler
	AccountById                     query.AccountByIdHandler
	AccountsById                    query.AccountsByIdHandler
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
