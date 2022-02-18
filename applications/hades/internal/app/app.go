package app

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	GenerateCCBillClubSupporterPaymentLink command.GenerateCCBillClubSupportPaymentLinkHandler
	ProcessCCBillWebhook                   command.ProcessCCBillWebhookHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler
}
