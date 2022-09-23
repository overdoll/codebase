package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"overdoll/libraries/errors"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/sentry_support"
)

func NewMediaCallbackClient(ctx context.Context, address string) (proto.MediaCallbackClient, func()) {

	callbackConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new media callback client"))
		zap.S().Fatalw("failed to start new media callback client", zap.Error(err))
	}

	return proto.NewMediaCallbackClient(callbackConnection), func() {
		_ = callbackConnection.Close()
	}
}
