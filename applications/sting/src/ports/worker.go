package ports

import (
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"

	"overdoll/applications/sting/src/app"
)

type Worker struct {
	app app.Application
}

func NewWorker() worker.Worker {

	c, err := client.NewClient(client.Options{
		HostPort: client.DefaultHostPort,
	})

	if err != nil {
		zap.S().Fatalf("unable to create client", err)
	}

	defer c.Close()

	w := worker.New(c, "sting", worker.Options{})

	//w.RegisterWorkflow()
	//w.RegisterActivity()

	//err = w.Run(worker.InterruptCh())

	return w
}
