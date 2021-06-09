package ports

import (
	"os"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
)

type Worker struct {
	app *app.Application
}

func NewWorker(app *app.Application) worker.Worker {

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
	})

	if err != nil {
		zap.S().Fatalf("unable to create client", err)
	}

	defer c.Close()

	w := worker.New(c, "sting", worker.Options{})

	w.RegisterWorkflow(adapters.UndoPost)
	w.RegisterWorkflow(adapters.DiscardPost)
	w.RegisterWorkflow(adapters.PublishPost)

	w.RegisterActivityWithOptions(&app.Commands.CreatePost, activity.RegisterOptions{Name: "CreatePostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PublishPost, activity.RegisterOptions{Name: "PublishPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.DiscardPost, activity.RegisterOptions{Name: "DiscardPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.UndoPost, activity.RegisterOptions{Name: "UndoPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.NewPendingPost, activity.RegisterOptions{Name: "NewPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.PostCustomResources, activity.RegisterOptions{Name: "PostCustomResourcesActivityHandler"})
	w.RegisterActivityWithOptions(&app.Commands.ReassignModerator, activity.RegisterOptions{Name: "ReassignModeratorActivityHandler"})

	return w
}
