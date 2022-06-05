package ports

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.ApprovePost)
	w.RegisterWorkflow(workflows.IssueClubInfraction)
	w.RegisterWorkflow(workflows.PutPostIntoModeratorQueue)
	w.RegisterWorkflow(workflows.RejectPost)
	w.RegisterWorkflow(workflows.ModerateRemovePost)
	w.RegisterWorkflow(workflows.ReportPost)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
