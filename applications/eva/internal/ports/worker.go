package ports

import (
	"context"
	"overdoll/applications/eva/internal/app/workflows"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/eva/internal/app"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.DeleteAccount)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
