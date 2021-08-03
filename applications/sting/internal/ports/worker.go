package ports

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/temporal/workflows"
	"overdoll/libraries/clients"
	"overdoll/libraries/helpers"
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

	RegisterActivities(app, w)

	return w, func() {
		client.Close()
	}
}

// needed so we can set it up in tests without having to duplicate code
func RegisterActivities(app *app.Application, w worker.ActivityRegistry) {
	w.RegisterActivityWithOptions(app.Commands.CreatePost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.CreatePost)})
	w.RegisterActivityWithOptions(app.Commands.DiscardPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.DiscardPost)})
	w.RegisterActivityWithOptions(app.Commands.UndoPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.UndoPost)})
	w.RegisterActivityWithOptions(app.Commands.PostCustomResources.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PostCustomResources)})
	w.RegisterActivityWithOptions(app.Commands.ReassignModerator.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.ReassignModerator)})
	w.RegisterActivityWithOptions(app.Commands.NewPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.NewPost)})
	w.RegisterActivityWithOptions(app.Commands.PublishPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PublishPost)})
}
