package bootstrap

import (
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/interceptor"
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"strconv"
	"time"
)

func NewWorker(client client.Client) worker.Worker {

	queue := os.Getenv("TEMPORAL_QUEUE")

	if queue == "" {
		queue = viper.GetString("temporal.queue")
	}

	var maxActivitySessions int

	overrideActivitySessions := os.Getenv("TEMPORAL_MAX_ACTIVITY_SESSIONS")

	if overrideActivitySessions != "" {
		parsed, err := strconv.ParseInt(overrideActivitySessions, 10, 64)
		if err != nil {
			zap.S().Fatalw("failed to parse activity sessions override", zap.Error(err))
		}

		maxActivitySessions = int(parsed)
	}

	return worker.New(client, queue,
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
