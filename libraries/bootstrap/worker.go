package bootstrap

import (
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func InitializeWorkerServer(srv worker.Worker) {
	if err := srv.Run(worker.InterruptCh()); err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "error running temporal worker"))
		zap.S().Fatalw("error running temporal worker", zap.Error(err))
	}
}
