package bootstrap

import (
	"go.temporal.io/sdk/worker"
	"go.uber.org/zap"
)

func InitializeWorkerServer(srv worker.Worker) {
	if err := srv.Run(worker.InterruptCh()); err != nil {
		zap.S().Fatalw("error running worker", zap.Error(err))
	}
}
