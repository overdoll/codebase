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
}

type Queries struct{}
