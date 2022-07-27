package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewStingClient(ctx context.Context, address string) (sting.StingClient, func()) {

	stingConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new sting client"))
		zap.S().Fatalw("failed to start new sting client", zap.Error(err))
	}

	return sting.NewStingClient(stingConnection), func() {
		_ = stingConnection.Close()
	}
}
