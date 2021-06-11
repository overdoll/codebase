package ports

import (
	"context"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/libraries/clients"
	"overdoll/libraries/helpers"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) worker.Worker {

	client := clients.NewTemporalClient(context.Background())

	defer client.Close()

	w := worker.New(client, "sting", worker.Options{})

	w.RegisterWorkflow(workflows.CreatePost)
	w.RegisterWorkflow(workflows.DiscardPost)
	w.RegisterWorkflow(workflows.UndoPost)
	w.RegisterWorkflow(workflows.PublishPost)

	RegisterActivities(*app, w)

	return w
}

// needed so we can set it up in tests without having to duplicate code
func RegisterActivities(app app.Application, w worker.ActivityRegistry) {
	w.RegisterActivityWithOptions(app.Commands.CreatePost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.CreatePost)})
	w.RegisterActivityWithOptions(app.Commands.DiscardPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.DiscardPost)})
	w.RegisterActivityWithOptions(app.Commands.UndoPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.UndoPost)})
	w.RegisterActivityWithOptions(app.Commands.PostCustomResources.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PostCustomResources)})
	w.RegisterActivityWithOptions(app.Commands.ReassignModerator.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.ReassignModerator)})
	w.RegisterActivityWithOptions(app.Commands.NewPendingPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.NewPendingPost)})
	w.RegisterActivityWithOptions(app.Commands.PublishPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PublishPost)})
}
