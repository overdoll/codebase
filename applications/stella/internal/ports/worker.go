package ports

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	w.RegisterWorkflow(workflows.AddClubMember)
	w.RegisterWorkflow(workflows.RemoveClubMember)
	w.RegisterWorkflow(workflows.AddClubSupporter)
	w.RegisterWorkflow(workflows.RemoveClubSupporter)
	w.RegisterWorkflow(workflows.NewSupporterPost)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
