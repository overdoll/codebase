package ports

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/workflows"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"

	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.UnSuspendClub)
	w.RegisterWorkflow(workflows.RemovePost)
	w.RegisterWorkflow(workflows.RejectPost)
	w.RegisterWorkflow(workflows.IssueClubInfractionManual)
	w.RegisterWorkflow(workflows.ApprovePost)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
