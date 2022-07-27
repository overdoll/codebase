package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewHadesClient(ctx context.Context, address string) (hades.HadesClient, func()) {

	hadesConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new hades client"))
		zap.S().Fatalw("failed to start new hades client", zap.Error(err))
	}

	return hades.NewHadesClient(hadesConnection), func() {
		_ = hadesConnection.Close()
	}
}
