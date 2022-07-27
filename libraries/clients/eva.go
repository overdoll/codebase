package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewEvaClient(ctx context.Context, address string) (eva.EvaClient, func()) {

	evaConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new eva client"))
		zap.S().Fatalw("failed to start new eva client", zap.Error(err))
	}

	return eva.NewEvaClient(evaConnection), func() {
		_ = evaConnection.Close()
	}
}
