package app

import (
	"overdoll/applications/carrier/internal/app/command"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	ConfirmAccountEmail                       command.ConfirmAccountEmailHandler
	NewLoginToken                             command.NewLoginTokenHandler
	NewClubSupporterSubscription              command.NewClubSupporterSubscriptionHandler
	ClubSupporterSubscriptionCancelled        command.ClubSupporterSubscriptionCancelledHandler
	ClubSupporterSubscriptionPaymentFailure   command.ClubSupporterSubscriptionPaymentFailureHandler
	ClubSupporterSubscriptionRefunded         command.ClubSupporterSubscriptionRefundedHandler
	UpcomingClubSupporterSubscriptionRenewals command.UpcomingClubSupporterSubscriptionRenewalsHandler
	ClubSupporterNoPosts                      command.ClubSupporterNoPostsHandler
	ClubSupporterRequiredPostReminder         command.ClubSupporterRequiredPostReminderHandler
	AccountDeletionBegin                      command.AccountDeletionBeginHandler
	AccountDeletionReminder                   command.AccountDeletionReminderHandler
	AccountDeleted                            command.AccountDeletedHandler
}

type Queries struct{}
