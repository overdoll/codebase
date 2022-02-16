package app

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	GenerateCCBillClubSupporterPaymentLink command.GenerateCCBillClubSupporterPaymentLinkHandler
	ProcessCCBillWebhook                   command.ProcessCCBillWebhookHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler
}
