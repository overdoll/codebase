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

	w.RegisterWorkflow(adapters.ReviewPost)
	w.RegisterWorkflow(adapters.StartPost)

	w.RegisterActivityWithOptions(&app.Activities.CreatePost, activity.RegisterOptions{Name: "CreatePostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Activities.ReviewPost, activity.RegisterOptions{Name: "ReviewPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Activities.NewPendingPost, activity.RegisterOptions{Name: "NewPostActivityHandler"})
	w.RegisterActivityWithOptions(&app.Activities.PostCustomResources, activity.RegisterOptions{Name: "PostCustomResourcesActivityHandler"})
	w.RegisterActivityWithOptions(&app.Activities.PostCompleted, activity.RegisterOptions{Name: "PublishPostActivityHandler"})

	return w
}
