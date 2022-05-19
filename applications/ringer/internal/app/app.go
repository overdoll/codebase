package app

import (
	"overdoll/applications/ringer/internal/app/command"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	CancelClubPayout            command.CancelClubPayoutHandler
	ClubPaymentDeduction        command.ClubPaymentDeductionHandler
	ClubPaymentDeposit          command.ClubPaymentDepositHandler
	DeleteAccountPayoutMethod   command.DeleteAccountPayoutMethodHandler
	InitiateClubPayout          command.InitiateClubPayoutHandler
	RetryClubPayout             command.RetryClubPayoutHandler
	SetPaxumAccountPayoutMethod command.SetPaxumAccountPayoutMethodHandler
	UpdateAccountDetails        command.UpdateAccountDetailsHandler
	UpdateClubPayoutDepositDate command.UpdateClubPayoutDepositDateHandler
	UpdateClubPlatformFee       command.UpdateClubPlatformFeeHandler

	DeleteAccountData command.DeleteAccountDataHandler
}

type Queries struct {
	PrincipalById           query.PrincipalByIdHandler
	AccountDetailsById      query.AccountDetailsByIdHandler
	AccountPayoutMethodById query.AccountPayoutMethodByIdHandler
	ClubBalanceById         query.ClubBalanceByIdHandler
	ClubPaymentById         query.ClubPaymentByIdHandler
	ClubPayoutById          query.ClubPayoutByIdHandler
	DepositRequestById      query.DepositRequestByIdHandler
	ClubPendingBalanceById  query.ClubPendingBalanceByIdHandler
	Countries               query.CountriesHandler
	DepositRequests         query.DepositRequestsHandler
	PlatformFeeByClubId     query.PlatformFeeByClubIdHandler
	SearchClubPayments      query.SearchClubPaymentsHandler
	SearchClubPayouts       query.SearchClubPayoutsHandler
}
