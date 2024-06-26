package ports

import (
	"context"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client)

	w.RegisterWorkflow(workflows.CCBillNewSaleOrUpSaleSuccess)
	w.RegisterWorkflow(workflows.GenerateClubSupporterPaymentReceiptFromAccountTransaction)
	w.RegisterWorkflow(workflows.GenerateClubSupporterRefundReceiptFromAccountTransaction)
	w.RegisterWorkflow(workflows.CCBillRenewalFailure)
	w.RegisterWorkflow(workflows.CCBillRenewalSuccess)
	w.RegisterWorkflow(workflows.CCBillCustomerDataUpdate)
	w.RegisterWorkflow(workflows.CCBillBillingDateChange)
	w.RegisterWorkflow(workflows.CCBillUserReactivation)
	w.RegisterWorkflow(workflows.CCBillExpiration)
	w.RegisterWorkflow(workflows.CCBillVoid)
	w.RegisterWorkflow(workflows.CCBillCancellation)
	w.RegisterWorkflow(workflows.CCBillRefund)
	w.RegisterWorkflow(workflows.CCBillChargeback)
	w.RegisterWorkflow(workflows.UpcomingSubscriptionReminderNotification)
	w.RegisterWorkflow(workflows.CancelActiveSupporterSubscriptionsForClub)
	w.RegisterWorkflow(workflows.ClubTransactionMetric)
	w.RegisterWorkflow(workflows.CancelAccountClubSupporterSubscription)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
