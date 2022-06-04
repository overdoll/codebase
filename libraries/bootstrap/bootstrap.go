package bootstrap

import (
	"go.uber.org/zap"
	"log"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support"
)

func NewBootstrap() {

	logger, err := zap_support.NewCustomZap()

	if err != nil {
		log.Fatalf("zap logger initialization failed: %v", err)
	}

	zap.ReplaceGlobals(logger)

	sentry_support.SentryInit()
}
