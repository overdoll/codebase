package ports

import (
	"os"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/client"
	temporal_worker "go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/worker"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) temporal_worker.Worker {

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
	})

	if err != nil {
		zap.S().Fatalf("unable to create client", err)
	}

	defer c.Close()

	w := temporal_worker.New(c, "sting", temporal_worker.Options{})

	w.RegisterWorkflow(worker.CreatePost)
	w.RegisterWorkflow(worker.DiscardPost)
	w.RegisterWorkflow(worker.UndoPost)
	w.RegisterWorkflow(worker.PublishPost)

	w.RegisterActivityWithOptions(&app.Commands.CreatePost, activity.RegisterOptions{Name: "CreatePostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PublishPost, activity.RegisterOptions{Name: "PublishPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.DiscardPost, activity.RegisterOptions{Name: "DiscardPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.UndoPost, activity.RegisterOptions{Name: "UndoPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.NewPendingPost, activity.RegisterOptions{Name: "NewPostHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PostCustomResources, activity.RegisterOptions{Name: "PostCustomResourcesHandler"})
	w.RegisterActivityWithOptions(&app.Commands.ReassignModerator, activity.RegisterOptions{Name: "ReassignModeratorHandler"})

	return w
}
