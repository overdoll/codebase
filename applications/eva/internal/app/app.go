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
	VerifyAuthenticationToken command.VerifyAuthenticationTokenHandler
	GrantAuthenticationToken  command.GrantAuthenticationTokenHandler

	UpdateAccountLanguage                   command.UpdateAccountLanguageHandler
	AddAccountEmail                         command.AddAccountEmailHandler
	UpdateAccountUsername                   command.UpdateAccountUsernameHandler
	ConfirmAccountEmail                     command.ConfirmAccountEmailHandler
	RevokeAccountSession                    command.RevokeAccountSessionHandler
	UpdateAccountEmailStatusToPrimary       command.UpdateAccountEmailStatusToPrimaryHandler
	GenerateAccountMultiFactorRecoveryCodes command.GenerateAccountMultiFactorRecoveryCodesHandler
	GenerateAccountMultiFactorTOTP          command.GenerateAccountMultiFactorTOTPHandler
	EnrollAccountMultiFactorTOTP            command.EnrollAccountMultiFactorTOTPHandler
	DisableAccountMultiFactor               command.DisableAccountMultiFactorHandler
	DeleteAccountEmail                      command.DeleteAccountEmailHandler
	RevokeAuthenticationToken               command.RevokeAuthenticationTokenHandler

	UnlockAccount command.UnlockAccountHandler
	LockAccount   command.LockAccountHandler

	RevokeAccountModeratorRole command.RevokeAccountModeratorRoleHandler
	RevokeAccountStaffRole     command.RevokeAccountStaffRoleHandler
	AssignAccountModeratorRole command.AssignAccountModeratorRoleHandler
	AssignAccountStaffRole     command.AssignAccountStaffRoleHandler

	CreateAccountWithAuthenticationToken      command.CreateAccountWithAuthenticationTokenHandler
	GrantAccountAccessWithAuthenticationToken command.GrantAccountAccessWithAuthenticationTokenHandler

	CreateAccountSessionOperator command.CreateAccountSessionOperatorHandler
	TouchAccountSessionOperator  command.TouchAccountSessionOperatorHandler
	RevokeAccountSessionOperator command.RevokeAccountSessionOperatorHandler
}

type Queries struct {
	AccountById                                 query.AccountByIdHandler
	AccountsByIds                               query.AccountsByIdsHandler
	AccountByEmail                              query.AccountByEmailHandler
	AccountByUsername                           query.AccountByUsernameHandler
	AccountEmailByEmail                         query.AccountEmailByEmailHandler
	AccountEmailsByAccount                      query.AccountEmailsByAccountHandler
	AccountEmailsLimit                          query.AccountEmailsLimitHandler
	AccountSessionById                          query.AccountSessionByIdHandler
	AccountSessionsByAccount                    query.AccountSessionsByAccountHandler
	AccountRecoveryCodesByAccount               query.AccountRecoveryCodesByAccountHandler
	IsAccountMultiFactorTOTPEnabled             query.IsAccountMultiFactorTOTPEnabledHandler
	AreAccountMultiFactorRecoveryCodesGenerated query.AreAccountMultiFactorRecoveryCodesGeneratedHandler
	ViewAuthenticationToken                     query.ViewAuthenticationTokenHandler
}
