package ports

import (
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
)

type Worker struct {
	app app.Application
}

func NewWorker(app app.Application) worker.Worker {

	c, err := client.NewClient(client.Options{
		HostPort: client.DefaultHostPort,
	})

	if err != nil {
		zap.S().Fatalf("unable to create client", err)
	}

	defer c.Close()

	w := worker.New(c, "sting", worker.Options{})

	w.RegisterWorkflow(adapters.ReviewPost)
	w.RegisterWorkflow(adapters.StartPost)

	w.RegisterActivity(app.Activities.CreatePost)
	w.RegisterActivity(app.Activities.ReviewPost)
	w.RegisterActivity(app.Activities.NewPendingPost)
	w.RegisterActivity(app.Activities.PostCustomResources)
	w.RegisterActivity(app.Activities.PostCompleted)

	return w
}
