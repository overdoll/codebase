package bootstrap

import (
	"go.uber.org/zap"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support"
)

func NewBootstrap() {

	logger, err := zap_support.NewCustomZap()

	if err != nil {
		panic(err)
	}

	zap.ReplaceGlobals(logger)

	// only show errors
	// disable for now  - this is too verbose
	//grpc_zap.ReplaceGrpcLoggerV2WithVerbosity(logger, int(zapcore.ErrorLevel))

	sentry_support.SentryInit()
}
