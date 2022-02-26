package ports

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.CCBillNewSaleOrUpSaleSuccess)
	w.RegisterWorkflow(workflows.GenerateClubSupporterReceiptFromAccountTransactionHistory)
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

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
