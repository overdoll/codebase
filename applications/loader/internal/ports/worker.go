package ports

import (
	"context"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/libraries/bootstrap"

	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client)

	w.RegisterWorkflow(workflows.ProcessMedia)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
