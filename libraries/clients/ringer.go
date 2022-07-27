package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	ringer "overdoll/applications/ringer/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewRingerClient(ctx context.Context, address string) (ringer.RingerClient, func()) {

	ringerConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new ringer client"))
		zap.S().Fatalw("failed to start new ringer client", zap.Error(err))
	}

	return ringer.NewRingerClient(ringerConnection), func() {
		_ = ringerConnection.Close()
	}
}
