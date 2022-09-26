package ports

import (
	"context"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client)

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
