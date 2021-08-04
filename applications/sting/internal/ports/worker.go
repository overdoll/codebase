package ports

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/temporal/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.CreatePost)
	w.RegisterWorkflow(workflows.DiscardPost)
	w.RegisterWorkflow(workflows.UndoPost)
	w.RegisterWorkflow(workflows.PublishPost)

	// register activities with our struct
	w.RegisterActivity(&app.Activities)

	return w, func() {
		client.Close()
	}
}
