package app

import (
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	VerifyAuthenticationToken command.VerifyAuthenticationTokenHandler
	GrantAuthenticationToken  command.GrantAuthenticationTokenHandler

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

	RevokeAccountWorkerRole    command.RevokeAccountWorkerRoleHandler
	RevokeAccountModeratorRole command.RevokeAccountModeratorRoleHandler
	RevokeAccountStaffRole     command.RevokeAccountStaffRoleHandler
	RevokeAccountArtistRole    command.RevokeAccountArtistRoleHandler
	AssignAccountModeratorRole command.AssignAccountModeratorRoleHandler
	AssignAccountStaffRole     command.AssignAccountStaffRoleHandler
	AssignAccountArtistRole    command.AssignAccountArtistRoleHandler
	AssignAccountWorkerRole    command.AssignAccountWorkerRoleHandler

	CreateAccountWithAuthenticationToken      command.CreateAccountWithAuthenticationTokenHandler
	GrantAccountAccessWithAuthenticationToken command.GrantAccountAccessWithAuthenticationTokenHandler

	CreateAccountSessionOperator command.CreateAccountSessionOperatorHandler
	TouchAccountSessionOperator  command.TouchAccountSessionOperatorHandler
	RevokeAccountSessionOperator command.RevokeAccountSessionOperatorHandler

	CancelAccountDeletion command.CancelAccountDeletionHandler
	DeleteAccount         command.DeleteAccountHandler
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
	LocationFromIp                              query.LocationFromIpHandler
}
