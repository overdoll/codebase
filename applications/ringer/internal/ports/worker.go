package ports

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.ClubPaymentDeduction)
	w.RegisterWorkflow(workflows.ClubPaymentDeposit)
	w.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)
	w.RegisterWorkflow(workflows.ProcessClubPayout)
	w.RegisterWorkflow(workflows.RetryClubPayout)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
