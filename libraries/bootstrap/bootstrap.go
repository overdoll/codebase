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

	sentry_support.SentryInit()
}
