package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/sentry_support"
)

func NewResourceCallbackClient(ctx context.Context, address string) (proto.ResourceCallbackClient, func()) {

	callbackConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new resource callback client"))
		zap.S().Fatalw("failed to start new resource callback client", zap.Error(err))
	}

	return proto.NewResourceCallbackClient(callbackConnection), func() {
		_ = callbackConnection.Close()
	}
}
