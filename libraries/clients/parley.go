package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewParleyClient(ctx context.Context, address string) (parley.ParleyClient, func()) {

	parleyConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new parley client"))
		zap.S().Fatalw("failed to start new parley client", zap.Error(err))
	}

	return parley.NewParleyClient(parleyConnection), func() {
		_ = parleyConnection.Close()
	}
}
