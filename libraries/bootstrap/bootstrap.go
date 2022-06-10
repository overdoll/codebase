package bootstrap

import (
	grpc_zap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
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
	grpc_zap.ReplaceGrpcLoggerV2WithVerbosity(logger, int(zapcore.ErrorLevel))

	sentry_support.SentryInit()
}
