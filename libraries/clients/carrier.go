package clients

import (
	"context"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
)

func NewCarrierClient(ctx context.Context, address string) (carrier.CarrierClient, func()) {

	carrierConnection, err := grpc.DialContext(ctx, address,
		getDefaultGrpcDialOptions()...,
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new carrier client"))
		zap.S().Fatalw("failed to start new carrier client", zap.Error(err))
	}

	return carrier.NewCarrierClient(carrierConnection), func() {
		_ = carrierConnection.Close()
	}
}
