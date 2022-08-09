package ports

import (
	"context"
	"overdoll/applications/eva/internal/app/workflows"
	"overdoll/libraries/bootstrap"

	"go.temporal.io/sdk/worker"
	"overdoll/applications/eva/internal/app"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client, 0)

	w.RegisterWorkflow(workflows.DeleteAccount)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
