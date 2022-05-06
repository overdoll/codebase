package ports

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/libraries/clients"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) (worker.Worker, func()) {

	client := clients.NewTemporalClient(context.Background())

	w := worker.New(client, viper.GetString("temporal.queue"), worker.Options{})

	w.RegisterWorkflow(workflows.SubmitPost)
	w.RegisterWorkflow(workflows.DiscardPost)
	w.RegisterWorkflow(workflows.RemovePost)
	w.RegisterWorkflow(workflows.DeletePost)
	w.RegisterWorkflow(workflows.PublishPost)
	w.RegisterWorkflow(workflows.AddPostLike)
	w.RegisterWorkflow(workflows.RemovePostLike)
	w.RegisterWorkflow(workflows.ArchivePost)
	w.RegisterWorkflow(workflows.UnArchivePost)
	w.RegisterWorkflow(workflows.UpdateTotalPostsForPostTags)
	w.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	w.RegisterWorkflow(workflows.DeleteAccountData)

	// register activities with our struct
	w.RegisterActivity(app.Activities)

	return w, func() {
		client.Close()
	}
}
