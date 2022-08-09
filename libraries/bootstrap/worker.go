package bootstrap

import (
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/interceptor"
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"time"
)

func NewWorker(client client.Client, maxActivitySessions int) worker.Worker {
	return worker.New(client, viper.GetString("temporal.queue"),
		worker.Options{
			MaxConcurrentActivityExecutionSize: maxActivitySessions,
			Interceptors:                       []interceptor.WorkerInterceptor{sentry_support.NewTemporalWorkerInterceptor()},
			WorkerStopTimeout:                  time.Second * 10,
		})
}

func InitializeWorkerServer(srv worker.Worker) {

	// set our server as a worker type
	sentry_support.SetServerType("worker")

	if err := srv.Run(worker.InterruptCh()); err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "error running temporal worker"))
		zap.S().Fatalw("error running temporal worker", zap.Error(err))
	}
}
