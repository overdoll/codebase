package ports

import (
	"context"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/worker"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/libraries/clients"
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

	w.RegisterActivityWithOptions(&app.Commands.CreatePost, activity.RegisterOptions{Name: "CreatePostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PublishPost, activity.RegisterOptions{Name: "PublishPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.DiscardPost, activity.RegisterOptions{Name: "DiscardPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.UndoPost, activity.RegisterOptions{Name: "UndoPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.NewPendingPost, activity.RegisterOptions{Name: "NewPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PostCustomResources, activity.RegisterOptions{Name: "PostCustomResourcesHandler"})
	w.RegisterActivityWithOptions(&app.Commands.ReassignModerator, activity.RegisterOptions{Name: "ReassignModeratorHandler"})

	return w
}
