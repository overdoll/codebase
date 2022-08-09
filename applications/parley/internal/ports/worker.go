package ports

import (
	"context"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/workflows"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client, 0)

	w.RegisterWorkflow(workflows.ApprovePost)
	w.RegisterWorkflow(workflows.IssueClubInfraction)
	w.RegisterWorkflow(workflows.PutPostIntoModeratorQueue)
	w.RegisterWorkflow(workflows.RejectPost)
	w.RegisterWorkflow(workflows.RemovePost)
	w.RegisterWorkflow(workflows.ReportPost)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
