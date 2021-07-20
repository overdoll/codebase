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
	VerifyAuthenticationToken                            command.VerifyAuthenticationTokenHandler
	ConsumeAuthenticationToken                           command.ConsumeAuthenticationTokenHandler
	GrantAuthenticationToken                             command.GrantAuthenticationTokenHandler
	CreateAccountWithAuthenticationToken                 command.CreateAccountWithAuthenticationTokenHandler
	LockAccount                                          command.LockAccountHandler
	UnlockAccount                                        command.UnlockAccountHandler
	CreateAccount                                        command.CreateAccountHandler
	AddAccountEmail                                      command.AddAccountEmailHandler
	UpdateAccountUsernameAndRetainPrevious               command.UpdateAccountUsernameAndRetainPreviousHandler
	ConfirmAccountEmail                                  command.ConfirmAccountEmailHandler
	RevokeAccountSession                                 command.RevokeAccountSessionHandler
	UpdateAccountEmailStatusToPrimary                    command.UpdateAccountEmailStatusToPrimaryHandler
	GenerateAccountMultiFactorRecoveryCodes              command.GenerateAccountMultiFactorRecoveryCodesHandler
	GenerateAccountMultiFactorTOTP                       command.GenerateAccountMultiFactorTOTPHandler
	EnrollAccountMultiFactorTOTP                         command.EnrollAccountMultiFactorTOTPHandler
	DisableAccountMultiFactor                            command.DisableAccountMultiFactorHandler
	GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotp command.GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler
	DeleteAccountEmail                                   command.DeleteAccountEmailHandler
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
