package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewLoaderClient(ctx context.Context, address string) (loader.LoaderClient, func()) {

	loaderConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new loader client"))
		zap.S().Fatalw("failed to start new loader client", zap.Error(err))
	}

	return loader.NewLoaderClient(loaderConnection), func() {
		_ = loaderConnection.Close()
	}
}
