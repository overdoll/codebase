package ports

import (
	"context"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := bootstrap.NewWorker(client)

	w.RegisterWorkflow(workflows.AddClubMember)
	w.RegisterWorkflow(workflows.RemoveClubMember)
	w.RegisterWorkflow(workflows.AddClubSupporter)
	w.RegisterWorkflow(workflows.RemoveClubSupporter)
	w.RegisterWorkflow(workflows.NewSupporterPost)
	w.RegisterWorkflow(workflows.TerminateClub)
	w.RegisterWorkflow(workflows.UnTerminateClub)
	w.RegisterWorkflow(workflows.ClubSupporterPostNotifications)
	w.RegisterWorkflow(workflows.SuspendClub)
	w.RegisterWorkflow(workflows.UnSuspendClub)
	w.RegisterWorkflow(workflows.CreateClub)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
